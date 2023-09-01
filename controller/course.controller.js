const courseModel = require("../models/course.model");
const testModel = require("../models/test.model");
const courseCreateValidator = require("../validator/course.validation");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

exports.create = (req, res) => {
	const form = new formidable.IncomingForm();

	form.parse(req, async (err, fields, files) => {
		if (err) {
			return res.status(500).json({
				success: false,
				message: "Error occurred while parsing form data",
				error: err.message,
			});
		}

		const { courseName, courseDescription, price, whatYouGet, youtubeLink } =
			fields;

		// Create the course object
		const courseObj = {
			courseName: courseName[0],
			courseDescription: courseDescription[0],
			price: parseInt(price[0]),
			whatYouGet: whatYouGet[0].split(","),
			youtubeLink: youtubeLink[0],
		};

		// Validate the course object
		const { error, value: validateCourseObject } =
			courseCreateValidator.validate(courseObj);

		if (error) {
			return res.status(400).json({
				success: false,
				message: "Validation error",
				error: error.details[0].message,
			});
		}

		if (!files.images) {
			return res.json({
				success: false,
				message: "No photo is selected",
			});
		}

		try {
			// Handle image upload
			const uploadFolderPath = path.join(__dirname, "../uploads/courses");

			const photo = files.images;
			const filePath = photo[0].filepath;
			const data = fs.readFileSync(filePath);
			const imageExtension = photo[0].mimetype.split("/")[1];

			const imageName = `${courseName}-${Date.now()}.${imageExtension}`;
			const imagePath = path.join(uploadFolderPath, imageName);

			fs.writeFileSync(imagePath, data);

			courseObj.images = imagePath;

			// Create the course in the database
			const newCourse = await courseModel.create(courseObj);

			if (!newCourse) {
				return res.json({
					success: false,
					message: "Error creating new course",
				});
			}

			res.status(200).json({
				success: true,
				message: "Course created successfully",
				course: newCourse,
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: "An error occurred while creating a new course",
				error: error.message,
			});
		}
	});
};

exports.updateCourseById = async (req, res) => {
	const { courseId } = req.params;
	const updates = req.body;
	console.log("Hello", courseId, updates);

	try {
		const updateCourse = await courseModel.update(updates, {
			where: {
				id: parseInt(courseId),
			},
		});

		if (!updateCourse) {
			return res.status(404).json({
				success: false,
				message: "Couldn't update course, Course Not Found!",
			});
		}

		res.status(200).json({
			success: true,
			message: "Course updated successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "An error occurred while updating the course",
			error: error.message,
		});
	}
};

exports.deleteCourseById = async (req, res) => {
	const { courseId } = req.params;

	try {
		const deletedCourse = await courseModel.destroy({
			where: {
				id: parseInt(courseId),
			},
		});

		if (!deletedCourse) {
			return res.json({
				success: false,
				message: "Couldn't delete course, Course Not Found!",
			});
		}

		res.status(200).json({
			success: true,
			message: "Course deleted successfully",
			deletedCourse,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "An error occurred while deleting the course",
			error: error.message,
		});
	}
};

exports.getAllCourses = async (req, res) => {
	try {
		const courses = await courseModel.findAll();
		if (!courses) {
			return res.json({
				success: false,
				message: "Course not found any course on the Database",
			});
		}

		res.status(200).json({
			success: true,
			message: "Course found successfully",
			courses,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "An error occurred while fetching courses from the Database",
			error: error.message,
		});
	}
};

exports.getCouresByCourseId = async (req, res) => {
	const { courseId } = req.params;
	try {
		const course = await courseModel.findByPk(courseId);
		if (!course) {
			return res.json({
				success: false,
				message: "Course not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "Course found successfully",
			course,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Something went wrong, while fetching courses by course id",
			error: error.message,
		});
	}
};

exports.getAllTestsByCourseId = async (req, res) => {
	const { courseId } = req.params;
	try {
		const tests = await testModel.findAll({
			where: { courseId: parseInt(courseId) },
		});

		res.status(200).json({
			success: true,
			message: "Tests retrieved successfully",
			tests: tests,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error retrieving tests",
			error: error.message,
		});
	}
};

exports.getPopularCourses = async (req, res) => {};
exports.getRecentlyAddedCourses = async (req, res) => {};
exports.getFeaturedCourses = async (req, res) => {};
exports.getFreeCourses = async (req, res) => {};
