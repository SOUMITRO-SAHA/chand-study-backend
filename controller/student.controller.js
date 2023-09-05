const { Op, Sequelize } = require("sequelize");
const userModel = require("../models/user.model");
const enrollmentModel = require("../models/enroll.model");

exports.getAllStudentsEnrolled = async (req, res) => {
	try {
		const students = await enrollmentModel.findAll({
			attributes: ["UserId"],
			group: ["UserId"],
			where: {
				UserId: { [Op.not]: null },
			},
		});

		res.status(200).json({
			success: true,
			message: "Successfully fetched the list of all enrolled students",
			students,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Something went wrong while fetching the enrolled students",
			error: error.message,
		});
	}
};

exports.getStudentsByCourseId = async (req, res) => {
	try {
		const { courseId } = req.params;

		const enrollments = await enrollmentModel.findAll({
			where: {
				courseId: parseInt(courseId),
				userId: {
					[Sequelize.Op.not]: null,
				},
			},
			attributes: ["UserId"],
			raw: true,
		});

		// const students = enrollments.map((enrollment) => enrollment.User);

		res.status(200).json({
			success: true,
			message:
				"Successfully fetched the list of students for the specified course",
			enrollments,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Something went wrong while fetching the students",
			error: error.message,
		});
	}
};

exports.getAllBlockedStudents = async (req, res) => {
	try {
		const blockedStudents = await userModel.findAll({
			where: {
				isBlocked: true,
			},
		});

		res.status(200).json({
			success: true,
			message: "Blocked students",
			students: blockedStudents,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Something went wrong, while fetching the blocked students",
			error: error.message,
		});
	}
};
