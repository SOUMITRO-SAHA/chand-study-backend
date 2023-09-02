const resultModel = require("../models/result.model");
const testModel = require("../models/test.model");
const sectionModel = require("../models/section.model");
const questionModel = require("../models/question.model");
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

// Todo: Not Working
exports.save = async (req, res) => {
	try {
		const { resultId, sectionId, questionId, answer } = req.body;

		// Check if a resultModel entry already exists for this resultId
		let result = await resultModel.findByPk(resultId);

		if (!result) {
			return res.status(404).json({
				success: false,
				message: "Result not found for the provided resultId.",
			});
		}

		// Find the section with matching sectionId
		const section = result.answers[sectionId];

		if (section) {
			// Update the answer for the specified questionId in the section
			section[questionId] = answer;

			// Save the updated resultModel entry
			await result.update({ answers: result.answers });

			res.status(200).json({
				success: true,
				message: "Answer saved successfully.",
			});
		} else {
			return res.status(404).json({
				success: false,
				message: "Section not found for the provided sectionId.",
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "An error occurred while saving the answer.",
			error: error.message,
		});
	}
};
