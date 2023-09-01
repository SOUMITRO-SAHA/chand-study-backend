const nodemailer = require("nodemailer");
const { config } = require("../config");
const twilio = require("twilio");
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { AuthOptions } = require("../utils/AuthOptions");
const {
	sigUpWithPhoneValidator,
	verifyEmailValidator,
} = require("../validator/user.validation");
const { sendOTPByEmail } = require("../utils/emailSender");
const accountSid = config.TW_ACCOUNT_SID;
const authToken = config.TW_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Generate OTP
function generateOTP() {
	return Math.floor(1000 + Math.random() * 9000).toString();
}

// Auth with Email
exports.signUpWithEmail = async (req, res) => {
	try {
		const { error, value } = sigUpWithPhoneValidator.validate(req.body);

		if (error) {
			return res.json({
				success: false,
				message: error.details[0].message,
			});
		}

		let { userName, email, phoneNumber } = value;

		const otp = generateOTP();

		if (phoneNumber.charAt(0) !== "+") {
			phoneNumber = "+91" + phoneNumber;
		}

		// const message = await client.messages.create({
		// 	body: `Your OTP is ${otp}`,
		// 	to: phoneNumber,
		// 	from: "+17623202467",
		// });

		const message = await sendOTPByEmail(email, otp);

		// First check whether the User already exists::
		const existingUser = await userModel.findOne({
			where: {
				email,
			},
		});

		if (existingUser) {
			return res.json({
				success: false,
				message: "User already exists, please login",
			});
		}

		console.log(typeof phoneNumber);

		// If not found: then create:
		const user = await userModel.create({
			userName,
			email,
			phoneNumber,
			otp,
		});

		if (!user) {
			return res.status(500).json({
				success: false,
				message:
					"Unable to create user, something went wrong with Database. Please try again",
			});
		}

		res.status(200).json({
			success: true,
			message: "OTP Send Successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Something went wrong, while Sign Up",
			error: error.message,
		});
	}
};

exports.loginWithEmail = async (req, res) => {
	const { email } = req.body;

	try {
		const otp = generateOTP();

		const user = await userModel.findOne({
			where: { email },
		});

		if (!user) {
			return res.status(401).json({
				success: false,
				message: "User not found, please sign up",
			});
		}

		// Email:
		const message = await sendOTPByEmail(email, otp);

		// Update the User:
		const userData = await userModel.update(
			{
				otp,
			},
			{
				where: {
					email,
				},
			}
		);

		if (!userData) {
			return res.status(500).json({
				success: false,
				message: "Coundn't send the OTP successfully",
			});
		}

		res.status(200).json({
			success: true,
			message: "OTP Send Successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Some error occurred while login with mobile number",
			error: error.message,
		});
	}
};

exports.verifyEmailOtp = async (req, res) => {
	try {
		const { error, value } = verifyEmailValidator.validate(req.body);

		if (error) {
			return res.json({
				success: false,
				message: error.details[0].message,
			});
		}

		const { otp, email } = value;

		const userData = await userModel.findOne({
			where: {
				email,
			},
		});

		if (userData.otp == otp) {
			// Now Update the Varification Status:
			const updatedUser = await userModel.update(
				{ otpVerified: true },
				{
					where: {
						email,
					},
				}
			);

			// Token:
			const token = jwt.sign(
				{
					id: userData.id,
					email: userData.email,
					role: userData.role,
				},
				config.JWT_SECRET,
				{
					expiresIn: config.JWT_EXPIRY,
				}
			);

			return res.cookie("token", token, AuthOptions).status(200).json({
				success: true,
				message: "OTP verified",
				data: userData,
				token,
			});
		}

		res.status(401).json({ success: false, message: "Invalid OTP" });
	} catch (err) {
		res.status(500).send({
			message: "Some error occurred while processing the request.",
			error: err.message,
		});
	}
};

// Admin Panel
exports.signUp = async (req, res) => {
	const { userName, email, password } = req.body;

	try {
		console.log(userName, email, password);

		const existingUser = await userModel.findOne({
			where: { email: email },
		});

		if (existingUser) {
			return res.status(409).json({
				success: false,
				message: "User already exists, please login",
			});
		}

		const encryptedPassword = await bcrypt.hash(password, 10);

		const newUser = await userModel.create({
			userName: userName,
			email: email,
			password: encryptedPassword,
		});

		if (!newUser) {
			return res.status(500).json({
				success: false,
				message: "Error creating user",
			});
		}

		const token = jwt.sign(
			{
				id: newUser.id,
				email: newUser.email,
				role: newUser.role,
			},
			config.JWT_SECRET,
			{
				expiresIn: config.JWT_EXPIRY,
			}
		);

		// Making the password undefined:
		newUser.password = undefined;

		res.status(201).cookie("token", token, AuthOptions).json({
			success: true,
			message: "Successfully Signed Up",
			user: newUser,
			token,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error during sign-up",
			error: error.message,
		});
	}
};

exports.logIn = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await userModel.findOne({
			where: { email: email },
		});

		if (!user) {
			return res.status(401).json({
				success: false,
				message: "Invalid credentials",
			});
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return res.status(401).json({
				success: false,
				message: "Invalid credentials",
			});
		}

		const token = jwt.sign(
			{
				id: user.id,
				email: user.email,
				role: user.role,
			},
			config.JWT_SECRET,
			{
				expiresIn: config.JWT_EXPIRY,
			}
		);

		// Making the Password undefine:
		user.password = undefined;

		res.status(200).cookie("token", token, AuthOptions).json({
			success: true,
			message: "Login successful",
			user,
			token,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error during login",
			error: error.message,
		});
	}
};

exports.logOut = async (req, res) => {
	try {
		res.clearCookie("token", AuthOptions);

		res.status(200).json({
			success: true,
			message: "Successfully logged out",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Something went wrong while logging out",
			error: error.message,
		});
	}
};

// Auth with Phone
exports.signUpWithPhoneNumber = async (req, res) => {
	try {
		const { error, value } = sigUpWithPhoneValidator.validate(req.body);

		if (error) {
			return res.json({
				success: false,
				message: error.details[0].message,
			});
		}

		let { userName, email, phoneNumber } = value;

		const otp = generateOTP();

		if (phoneNumber.charAt(0) !== "+") {
			phoneNumber = "+91" + phoneNumber;
		}

		// const message = await client.messages.create({
		// 	body: `Your OTP is ${otp}`,
		// 	to: phoneNumber,
		// 	from: "+17623202467",
		// });

		const message = await sendOTPByEmail(email, otp);

		// First check whether the User already exists::
		const existingUser = await userModel.findOne({
			where: {
				email,
			},
		});

		if (existingUser) {
			return res.json({
				success: false,
				message: "User already exists, please login",
			});
		}

		console.log(typeof phoneNumber);

		// If not found: then create:
		const user = await userModel.create({
			userName,
			email,
			phoneNumber,
			otp,
		});

		if (!user) {
			return res.status(500).json({
				success: false,
				message:
					"Unable to create user, something went wrong with Database. Please try again",
			});
		}

		res.status(200).json({
			success: true,
			message: "OTP Send Successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Something went wrong, while Sign Up",
			error: error.message,
		});
	}
};

exports.logInWithPhoneNumber = async (req, res) => {
	const { phoneNumber } = req.body;
	try {
		const otp = generateOTP();

		// Make Sure to pass the Phone Number with Valid Country Code: For Now Code is for India only
		if (phoneNumber.charAt(0) !== "+") {
			phoneNumber = "+91" + phoneNumber;
		}

		const userObject = {
			phoneNumber,
			otp,
		};

		// First Find the User by phone number:
		const user = await userModel.findOne({
			where: {
				phoneNumber,
			},
		});

		// If Not Found Please Sign Up:
		if (!user) {
			return res.json({
				success: false,
				message: "User not found, please sign up",
			});
		}

		// Now Extract the Email Address:
		const email = user.email;

		// Twillio:
		// const message = await client.messages.create({
		// 	body: `Your OTP is ${otp}`,
		// 	to: phoneNumber,
		// 	from: "+17623202467",
		// });

		// Email:
		const message = await sendOTPByEmail(email, otp);

		// Update the User:
		const userData = await userModel.update(userObject, {
			where: {
				phoneNumber,
			},
		});

		if (!userData) {
			return res.status(500).json({
				success: false,
				message: "Coundn't send the OTP successfully",
			});
		}

		res.status(200).json({
			success: true,
			message: "OTP Send Successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Some error occurred while login with mobile number",
			error: error.message,
		});
	}
};

exports.verifyPhoneOtp = async (req, res) => {
	try {
		const { otp, phoneNumber } = req.body;
		const userData = await userModel.findOne({
			where: {
				phoneNumber,
			},
		});

		if (userData.otp == otp) {
			const otpVerifyData = {
				otpverify: 1,
			};
			// Now Update the Varification Status:
			const updatedUser = await userModel.update(
				{ otpVerified: true },
				{
					where: {
						phoneNumber,
					},
				}
			);
			res.json({ success: true, message: "OTP verified", data: userData });
		} else {
			res.json({ success: false, message: "Invalid OTP" });
		}
	} catch (err) {
		res.status(500).send({
			message: "Some error occurred while processing the request.",
			error: err.message,
		});
	}
};
