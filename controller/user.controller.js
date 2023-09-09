const userModel = require("../models/user.model");
const courseModel = require("../models/course.model");
const enrollModel = require("../models/enroll.model");
const { Sequelize, Op } = require("sequelize");
const { addMonths } = require("date-fns");

// Get All the Users:
exports.getAllUsers = async (req, res) => {
	try {
		const users = await userModel.findAll();

		res.status(200).json({
			success: true,
			message: "Successfully fetched all users",
			users,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "An error occurred while fetching users",
			error: error.message,
		});
	}
};

// Get Users by Id:
exports.getUserById = async (req, res) => {
	const { userId } = req.params;

	try {
		const user = await userModel.findByPk(userId);

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "Successfully found the user",
			user: user,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "An error occurred while fetching user by ID",
			error: error.message,
		});
	}
};

// Get User By PhoneNumber Number:
exports.getUserByPhoneNumber = async (req, res) => {
	try {
		let { phoneNumber } = req.params;

		// Condition for country code:
		if (phoneNumber.charAt(0) !== "+") {
			phoneNumber = "+91" + phoneNumber;
		}

		const user = await userModel.findOne({
			where: {
				phoneNumber: phoneNumber,
			},
		});

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "Successfully found the user",
			user: user,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "An error occurred while fetching user by mobile number",
			error: error.message,
		});
	}
};

// Update user by Id:
exports.updateUserById = async (req, res) => {
	const { userId } = req.params;
	const updates = req.body;

	try {
		const updatedUser = await userModel.update(updates, {
			where: {
				id: userId,
			},
			returning: true,
		});

		if (!updatedUser) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "User updated successfully",
			numberOfColumnsChanged: updatedUser[1],
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "An error occurred while updating user",
			error: error.message,
		});
	}
};

// Block User by Id:
exports.blockUserById = async (req, res) => {
	const { userId } = req.params;

	try {
		const blockedUser = await userModel.update(
			{ isBlocked: true },
			{
				where: {
					id: userId,
				},
			}
		);

		if (!blockedUser) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "User blocked successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "An error occurred while blocking user",
			error: error.message,
		});
	}
};

// Un-Block User by Id:
exports.unBlockUserById = async (req, res) => {
	const { userId } = req.params;

	try {
		const unblockedUser = await userModel.update(
			{ isBlocked: false },
			{
				where: {
					id: userId,
				},
			}
		);

		if (!unblockedUser) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "User un-blocked successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "An error occurred while un-blocking user",
			error: error.message,
		});
	}
};

// Enrolling the User into the Course:
exports.enrollInCourse = async (req, res) => {
	let { courseId } = req.params;
	let userId = req.user.id;

	try {
		// Converting to Number:
		if (typeof userId !== "number") {
			userId = Number(userId);
		}
		if (typeof courseId !== "number") {
			courseId = Number(courseId);
		}

		const existingEnrollment = await enrollModel.findOne({
			where: {
				userId,
				courseId,
			},
		});

		if (existingEnrollment) {
			return res.status(400).json({
				success: false,
				message: "User is already enrolled in the course",
			});
		}

		const course = await courseModel.findByPk(courseId);

		if (!course) {
			return res.status(404).json({
				success: false,
				message: "Course not found",
			});
		}

		const defaultValidityDuration = course.defaultValidityDuration;

		if (!defaultValidityDuration) {
			const enrolledUser = await enrollModel.create({
				userId,
				courseId,
			});

			if (!enrolledUser) {
				return res.status(500).json({
					success: false,
					message: "Unable to enroll the user into the course",
				});
			}

			return res.status(200).json({
				success: true,
				message: "User enrolled in the course successfully",
				enrolledUser,
			});
		}

		const enrollmentDate = new Date();
		const validity = addMonths(enrollmentDate, defaultValidityDuration);

		const enrolledUser = await enrollModel.create({
			userId,
			courseId,
			validity,
		});

		if (!enrolledUser) {
			return res.status(500).json({
				success: false,
				message: "Unable to enroll the user into the course",
			});
		}

		res.status(200).json({
			success: true,
			message: "User enrolled in the course successfully",
			enrolledUser,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "An error occurred while enrolling in the course",
			error: error.message,
		});
	}
};

// Get the the courses that the user enrolled:
// Todo: Pending If client asked.
exports.getCoursesEnrolledByUser = async (req, res) => {
	const userId = req.user.id;
	try {
		console.log("Getting the courses by User Id");
		console.log("UID:", userId);

		const enrolledCourses = await enrollModel.findAll({
			where: {
				UserId: userId,
			},
			include: [
				{
					model: courseModel,
				},
			],
		});

		res.status(200).json({
			success: true,
			message: "Successfully found all the enrolled courses",
			courses: enrolledCourses.map((course) => course.Course),
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "An error occurred while fetching enrolled courses",
			error: error.message,
		});
	}
};
