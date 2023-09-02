const Joi = require("joi");

exports.testValidator = Joi.object({
	testName: Joi.string(),
	duration: Joi.number().integer(),
	courseId: Joi.number().integer(),
	language: Joi.string().valid("HINDI", "ENGLISH"),
	instruction: Joi.string(),
	totalMarks: Joi.number().integer(),
	totalQuestions: Joi.number().integer(),
});
