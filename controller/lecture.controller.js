const Course = require("../models/course.model");
const Lecture = require("../models/lecture.model");
const {
	lectureCreateValidator,
	lectureUpdateValidator,
} = require("../validator/lecture.validation");

exports.createByCourseId = async (req, res) => {
	try {
		const { error, value } = lectureCreateValidator.validate(req.body);

		if (error) {
			return res.status(400).json({
				success: false,
				message: "Validation failed",
				error: error.details[0].message,
			});
		}

		const { courseId, lectureName } = value;

		const existingLecture = await Lecture.findOne({
			where: {
				courseId,
				lectureName,
			},
		});

		if (existingLecture) {
			return res.status(404).json({
				success: false,
				message: "A lecture is already in this course with the same name",
			});
		}

		const lecture = await Lecture.create(value);

		res.status(200).json({
			success: true,
			message: "Lecture created successfully",
			lecture,
		});
	} catch (error) {
		// Handle any potential errors
		res.status(500).json({
			success: false,
			message: "An error occurred while creating the lecture",
			error: error.message,
		});
	}
};

exports.getAllByCourseId = async (req, res) => {
	try {
		const { courseId } = req.params;

		const lectures = await Lecture.findAll({
			where: { courseId: parseInt(courseId) },
		});
		res.status(200).json({
			success: true,
			message: "Lectures retrieved by course ID successfully",
			lectures,
		});
	} catch (error) {
		// Handle any potential errors
		res.status(500).json({
			success: false,
			message: "An error occurred while retrieving lectures by course ID",
			error: error.message,
		});
	}
};

exports.updateById = async (req, res) => {
	try {
		const { lectureId } = req.params;
		const { error, value } = lectureUpdateValidator.validate(req.body);

		if (error) {
			return res.status(400).json({
				success: false,
				message: "Validation failed",
				error: error.details[0].message,
			});
		}

		const [updatedRowsCount, updatedLecture] = await Lecture.update(value, {
			where: {
				id: parseInt(lectureId),
			},
		});

		if (updatedRowsCount > 0) {
			res.status(200).json({
				success: true,
				message: "Lecture updated successfully",
				lecture: updatedLecture,
			});
		} else {
			res.status(404).json({ success: false, message: "Lecture not found" });
		}
	} catch (error) {
		// Handle any potential errors
		res.status(500).json({
			success: false,
			message: "An error occurred while updating the lecture",
			error: error.message,
		});
	}
};

exports.deleteById = async (req, res) => {
	try {
		const { lectureId } = req.params;

		const deletedRowCount = await Lecture.destroy({
			where: {
				id: lectureId,
			},
		});

		if (deletedRowCount > 0) {
			res
				.status(200)
				.json({ success: true, message: "Lecture deleted successfully" });
		} else {
			res.status(404).json({ success: false, message: "Lecture not found" });
		}
	} catch (error) {
		// Handle any potential errors
		res.status(500).json({
			success: false,
			message: "An error occurred while deleting the lecture",
			error: error.message,
		});
	}
};

exports.getAll = async (req, res) => {
	try {
		// Implementation for getting all lectures
		// Example: const lectures = await Lecture.findAll();
		//          ...
		//          res.status(200).json({ success: true, lectures });

		// Send a success response
		res
			.status(200)
			.json({ success: true, message: "All lectures retrieved successfully" });
	} catch (error) {
		// Handle any potential errors
		res.status(500).json({
			success: false,
			message: "An error occurred while retrieving lectures",
			error: error.message,
		});
	}
};
