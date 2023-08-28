const userModel = require("../models/user.model");
const courseModel = require("../models/course.model");
const UserCourse = require("../models/userCourse.model");

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
		const { phoneNumber } = req.params;
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
	const { courseId } = req.params;
	const userId = req.user.id;

	try {
		const isEnrolled = await UserCourse.findOne({
			where: {
				UserId: userId,
				CourseId: parseInt(courseId),
			},
		});

		if (isEnrolled) {
			return res.status(400).json({
				success: false,
				message: "User is already enrolled in the course",
			});
		}

		const enrolledUser = await UserCourse.create({
			UserId: userId,
			CourseId: parseInt(courseId),
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

		const enrolledCourses = await UserCourse.findAll({
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
