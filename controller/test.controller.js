const testModel = require("../models/test.model");
const sectionModel = require("../models/section.model");
const questionModel = require("../models/question.model");
const userModel = require("../models/user.model");
const courseModel = require("../models/course.model");

const {
	sectionCrateValidator,
	questionCreateValidator,
	sectionCreateValidator,
} = require("../validator/course.validation");
const { testValidator } = require("../validator/test.validation");

// Test Controllers:
// Todo: Pending
exports.getAllTestsByUserId = async (req, res) => {
	try {
		const { userId } = req.params;

		const user = await userModel.findByPk(userId, {
			where: {
				include: {
					module: testModel,
					include: sectionModel,
				},
			},
		});

		if (!user) {
			return res.json({
				success: false,
				message: "User not found.",
			});
		}

		const tests = user.courses.reduce((acc, course) => {
			acc.push(...course.Tests);
			return acc;
		}, []);

		res.status(200).json({
			success: true,
			message: "Successfully fetch the test for user",
			tests,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Something went wrong, while fetching the test",
			error: error.message,
		});
	}
};

exports.createTest = async (req, res) => {
	try {
		const { error, value } = testValidator.validate(req.body);

		if (error) {
			return res.json({ success: false, error: error.message });
		}

		const {
			testName,
			duration,
			courseId,
			language,
			totalMarks,
			totalQuestions,
		} = value;

		const newTest = await testModel.create({
			testName,
			duration,
			courseId,
			language,
			totalMarks,
			totalQuestions,
		});

		res.status(200).json({
			success: true,
			message: "Test created successfully",
			test: newTest,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "An error occurred while creating the test.",
			error: error.message,
		});
	}
};

exports.updateTestByTestId = async (req, res) => {
	try {
		const { testId } = req.params;
		const test = await testModel.findByPk(testId);

		if (!test) {
			return res.status(404).json({
				success: false,
				message: "Test not found!",
			});
		}

		const { error } = testValidator.validate(req.body, {
			allowUnknown: true,
			abortEarly: false,
		});

		if (error) {
			return res.status(400).json({
				success: false,
				message: "Validation error",
				errors: error.details.map((err) => err.message),
			});
		}

		await test.update(req.body);

		res.status(200).json({
			success: true,
			message: "Test Updated successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Something went wrong while updating the test",
			error: error.message,
		});
	}
};

exports.getAllTestsByCourseId = async (req, res) => {
	try {
		const { courseId } = req.params;
		const test = await testModel.findAll({
			where: {
				courseId,
			},
		});

		if (!test) {
			return res.json({
				success: false,
				message:
					"Something went wrong, while fetching the test of this course.",
			});
		}

		res.status(200).json({
			success: true,
			message: "Successfully fetch all the tests",
			test,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message:
				"Something went wrong, while fetching the test of this course. Database error",
			error: error.message,
		});
	}
};

exports.getTestByTestId = async (req, res) => {
	try {
		const { testId } = req.params;
		const test = await testModel.findByPk(testId, {
			include: {
				model: sectionModel,
				where: {
					testId,
				},
				include: {
					model: questionModel,
				},
			},
		});

		if (!test) {
			return res.json({
				success: false,
				message: "Test not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "Successfully fetched the Test",
			test,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "An error occurred while fetching the Test",
			error: error.message,
		});
	}
};

// Section Controllers:
exports.createSection = async (req, res) => {
	try {
		const { error, value } = sectionCreateValidator.validate(req.body);

		if (error) {
			res.json({ success: false, error: error.message });
			return;
		}

		const {
			title,
			marks,
			negativeMarking,
			canSkip,
			minQuestionsToAdvance,
			testId,
			totalQuestions,
			marksPerQuestion,
		} = value;

		const newSection = await sectionModel.create({
			title,
			marks,
			negativeMarking,
			canSkip,
			minQuestionsToAdvance,
			testId,
			totalQuestions,
			marksPerQuestion,
		});

		if (!newSection) {
			return res.json({
				success: false,
				message: "Failed to create a new section, database error",
			});
		}

		res.status(200).json({
			success: true, // Change to true
			message: "Successfully created a new Section",
			section: newSection,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Something went wrong while creating a new section",
			error: error.message,
		});
	}
};

exports.getSectionsByCourseTest = async (req, res) => {
	try {
		const { courseId, testId } = req.params;
		const course = await courseModel.findByPk(courseId, {
			include: {
				model: testModel,
				where: { id: testId },
				include: {
					model: sectionModel,
					while: { testId: testId },
				},
			},
		});

		if (!course) {
			return res.json({
				success: false,
				message: `There is no test in this course with this test id: ${testId}`,
			});
		}

		const section = course?.tests[0].sections;
		res.status(200).json({
			success: true,
			message:
				"Successfully fetched the list of questions of the specified section",
			section,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Something went wrong, while fetching the courses",
			error: error.message,
		});
	}
};

// Questions Controllers:
exports.createQuestion = async (req, res) => {
	try {
		const { error, value } = questionCreateValidator.validate(req.body);

		if (error) {
			return res.status(400).json({ success: false, error: error.message });
		}

		const { content, options, correctAnswer, sectionId } = value;

		const newQuestion = await questionModel.create({
			content,
			options,
			correctAnswer,
			sectionId,
		});

		res.status(200).json({
			success: true,
			message: "Question created successfully",
			question: newQuestion,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "An error occurred while creating the question.",
			error: error.message,
		});
	}
};

exports.updateQuestionsByQuestionId = async (req, res) => {
	try {
		const { questionId } = req.params;

		// Now, find the Question in the database
		const question = await questionModel.findByPk(questionId);

		if (!question) {
			return res.json({
				success: false,
				message: "Question not found",
			});
		}

		// Update:
		await question.update(req.body);

		res
			.status(200)
			.json({ success: true, message: "Question updated successfully." });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
};

exports.deleteQuestionByQuestionId = async (req, res) => {
	try {
		const { questionId } = req.params;
		await questionModel.destroy({
			where: {
				id: questionId,
			},
		});

		res.status(200).json({
			success: true,
			message: "Question deleted successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.getQuestionsBySectionTitle = async (req, res) => {
	try {
		const { title } = req.params;

		// First find the section based on the title
		const section = await sectionModel.findOne({
			where: { title },
			include: questionModel,
		});

		if (!section) {
			return res.json({
				success: false,
				message: "Section not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "Successfully fetched all the questions of current section.",
			questions: section.questions,
		});
	} catch (error) {}
};

// Extra:
exports.getTestInstructionsByTestId = async (req, res) => {
	try {
		const { testId } = req.params;

		const test = await testModel.findByPk(testId);

		if (!test) {
			return res.status(404).json({
				success: false,
				message: "Test not found",
			});
		}

		res.status(200).json({
			success: true,
			data: {
				questions: test.totalQuestions,
				marks: test.totalMarks,
				instruction: test.instruction,
			},
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Something went wrong while fetching test instructions",
			error: error.message,
		});
	}
};
