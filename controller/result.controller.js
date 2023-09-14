const resultModel = require("../models/result.model");
const testModel = require("../models/test.model");
const sectionModel = require("../models/section.model");
const questionModel = require("../models/question.model");
const userModel = require("../models/user.model");
const sequelize = require("../config/db.config");
const { Op } = require("sequelize");
/********************************* 
Answers Format:
{
  "sectionId":{
    "questionId": "1",
  }
}
*********************************/

exports.create = async (req, res) => {
	try {
		const { testId, userId } = req.body;

		const test = await testModel.findByPk(testId, {
			include: [
				{
					model: sectionModel,
					include: questionModel,
				},
			],
		});

		if (!test) {
			return res.status(400).json({
				success: false,
				message: "Test not found",
			});
		}

		// For, each test therir will be only one correnct answer which is present in the test model:
		if (test.answers === null) {
			const correctAnswers = {};

			for (const section of test.sections) {
				const sectionId = section.id;
				const sectionAnswers = {};

				for (const question of section.questions) {
					const questionId = question.id;
					sectionAnswers[questionId] = question.correctAnswer;
				}
				correctAnswers[sectionId] = sectionAnswers;
			}

			await test.update({ answers: correctAnswers });
		}

		// Create an array to store answers for each section
		const answersObject = {};

		// Iterate through the sections
		for (const section of test.sections) {
			const sectionId = section.id;
			const sectionAnswers = {};

			// Iterate through the questions in the section
			for (const question of section.questions) {
				const questionId = question.id;
				sectionAnswers[questionId] = null;
			}

			// Add section data to the answers object
			answersObject[sectionId] = sectionAnswers;
		}

		// Create a new entry in the Result model
		const result = await resultModel.create({
			userId: userId,
			testId: testId,
			answers: answersObject,
		});

		res.status(200).json({
			success: true,
			data: result,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

exports.save = async (req, res) => {
	try {
		const { resultId, sectionId, questionId, answer } = req.body;

		const updateQuery = await resultModel.update(
			{
				answers: sequelize.fn(
					"JSON_SET",
					sequelize.col("answers"),
					`$."${sectionId}"."${questionId}"`,
					answer
				),
			},
			{
				where: {
					id: resultId,
				},
			}
		);

		res.status(200).json({
			success: true,
			message: "Answer saved successfully.",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "An error occurred while saving the answer.",
			error: error.message,
		});
	}
};

exports.evaluate = async (req, res) => {
	try {
		const { testId, resultId } = req.params;

		// Find the original answers from the test model
		const test = await testModel.findByPk(testId, {
			include: [
				{
					model: sectionModel,
					include: questionModel,
				},
			],
		});

		if (!test) {
			return res.status(404).json({
				success: false,
				message: "Test Not Found",
			});
		}

		// Find the user's answers from the result model
		const result = await resultModel.findByPk(resultId);

		if (!result) {
			return res.status(404).json({
				success: false,
				message: "Result Not Found",
			});
		}

		const correctAnswer = test.answers;
		const userAnswer = result.answers;
		let totalMarks = 0;
		let negativeMarks = 0;
		let marks = 0;

		for (const sectionId in correctAnswer) {
			if (correctAnswer.hasOwnProperty(sectionId)) {
				const section = correctAnswer[sectionId];
				const userSection = userAnswer[sectionId];
				const currentSection = test.sections.find((s) => {
					return s.id == sectionId;
				});
				if (currentSection) {
					negativeMarks = currentSection.negativeMarking;
					marks = currentSection.marksPerQuestion;
				}

				// Initialize a variable to keep track of the section marks
				let sectionMarks = 0;

				// Iterate through the questions in the section
				for (const questionId in section) {
					if (section.hasOwnProperty(questionId)) {
						const correctAns = section[questionId];
						const userAns = userSection[questionId];

						if (userAns === correctAns) {
							sectionMarks += marks;
						} else {
							sectionMarks -= negativeMarks;
						}
					}
				}

				// Update the section marks in the result model
				result.answers[sectionId].sectionMarks = sectionMarks;

				// Add the section marks to the total marks
				totalMarks += sectionMarks;
			}
		}

		result.marks = totalMarks;
		await result.save();

		res.status(200).json({
			success: true,
			message: "Successfully evaluated the answers and updated marks.",
			result,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Something went wrong while evaluating the result.",
			error: error.message,
		});
	}
};

// Result:
exports.getTestResultsByTestId = async (req, res) => {
	try {
		let { testId } = req.params;

		const results = await resultModel.findAll({
			where: { testId: parseInt(testId) },
			include: {
				model: userModel,
				attributes: ["userName", "email", "phoneNumber"],
				required: true,
			},
		});

		res.status(200).json({
			success: true,
			message: "Successfully retrieved all the results",
			results,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};
