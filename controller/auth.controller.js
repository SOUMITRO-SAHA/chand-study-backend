const { config } = require("../config");
const twilio = require("twilio");
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { AuthOptions } = require("../utils/AuthOptions");
const accountSid = config.TW_ACCOUNT_SID;
const authToken = config.TW_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Generate OTP
function generateOTP() {
	return Math.floor(1000 + Math.random() * 9000).toString();
}

exports.signUpWithEmail = async (req, res) => {
	const { userName, email, password } = req.body;

	try {
		const existingUser = await userModel.findOne({
			where: { email: email },
		});

		if (existingUser) {
			return res.status(409).json({
				success: false,
				message: "Email already registered",
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
			},
			config.JWT_SECRET,
			{
				expiresIn: config.JWT_EXPIRY,
			}
		);

		newUser.token = token;
		newUser.password = undefined;

		res.status(201).cookie("token", token, AuthOptions).json({
			success: true,
			message: "Successfully Signed Up",
			user: newUser,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error during sign-up",
			error: error.message,
		});
	}
};

exports.loginWithEmail = async (req, res) => {
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
			},
			config.JWT_SECRET,
			{
				expiresIn: config.JWT_EXPIRY,
			}
		);

		user.token = token;
		user.password = undefined;

		res.status(200).cookie("token", token, AuthOptions).json({
			success: true,
			message: "Login successful",
			user,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error during login",
			error: error.message,
		});
	}
};

// Todo:Pending:
exports.signUp = async (req, res) => {
	const { userName, phoneNumber } = req.body;
	const otp = generateOTP();
	try {
		const message = await client.messages.create({
			body: `Your OTP: ${otp}`,
			to: phoneNumber,
			from: "+17623202467",
		});

		console.log(message);

		const newUser = await userModel.create({
			userName: userName,
			phoneNumber: phoneNumber,
			otp: otp,
		});

		if (!newUser) {
			return res.status(404).json({
				success: false,
				message: "Creating user failed",
			});
		}

		// Create a token to sent the user
		const token = jwt.sign(
			{
				id: newUser.id,
				email,
				phone,
			},
			config.JWT_SECRET,
			{
				expiresIn: config.JWT_EXPIRY,
			}
		);

		// Now making the password undefined
		newUser.token = token;

		// Sending Cookie and Res:
		res.status(200).cookie("token", token, AuthOptions).json({
			success: true,
			message: "Successfully Signed Up",
			user: newUser,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error creating user",
			error: error.message,
		});
	}
};

// Todo: Pending:
exports.loginWithPhoneNumber = async (req, res) => {
	const { phoneNumber, otp } = req.body;

	try {
		if (otpStore.get(phoneNumber) === otp) {
			otpStore.delete(phoneNumber);

			// Find the user by phoneNumber
			const user = await userModel.findOne({
				where: { phoneNumber: phoneNumber },
				attributes: { exclude: ["password"] },
			});

			if (user) {
				// Here, you can generate a JWT token for user authentication
				// and send it back to the client for subsequent requests
				res.status(200).json({
					success: true,
					message: "Login successful",
					user: user,
				});
			} else {
				res.status(404).json({
					success: false,
					message: "User not found",
				});
			}
		} else {
			res.status(400).json({
				success: false,
				message: "Invalid OTP",
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error during login",
			error: error.message,
		});
	}
};
