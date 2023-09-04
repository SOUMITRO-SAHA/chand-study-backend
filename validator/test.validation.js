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

exports.updateAnswersValidator = Joi.object({
	userId: Joi.number().required(),
	testId: Joi.number().required(),
	answer: Joi.object().pattern(
		Joi.number(),
		Joi.object().pattern(Joi.number(), Joi.string().allow(""))
	),
});
