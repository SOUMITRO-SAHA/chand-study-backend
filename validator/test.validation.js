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

exports.questionCreateValidator = Joi.object({
	content: Joi.string().required(),
	options: Joi.array().items(Joi.string()).required(),
	correctAnswer: Joi.string().required(),
	sectionId: Joi.number().positive().required(),
});

exports.testCreateSchema = Joi.object({
	testName: Joi.string().required(),
	duration: Joi.number().positive().required(),
	courseId: Joi.number().positive().required(),
	language: Joi.string().required(),
});

exports.sectionCreateValidator = Joi.object({
	testId: Joi.number().positive().required(),
	title: Joi.string().required(),
	marks: Joi.number().positive().required(),
	negativeMarking: Joi.number().positive().required(),
	canSkip: Joi.boolean().default(false),
	minQuestionsToAdvance: Joi.number().integer().positive().allow(null),
	totalQuestions: Joi.number().integer().positive().required(),
	marksPerQuestion: Joi.number().positive().required(),
});

exports.sectionUpdateValidator = Joi.object({
	title: Joi.string(),
	marks: Joi.number().positive(),
	negativeMarking: Joi.number().positive(),
	canSkip: Joi.boolean(),
	minQuestionsToAdvance: Joi.number().integer(),
	marksPerQuestion: Joi.number().positive(),
});

exports.updateAnswersValidator = Joi.object({
	userId: Joi.number().required(),
	testId: Joi.number().required(),
	answer: Joi.object().pattern(
		Joi.number(),
		Joi.object().pattern(Joi.number(), Joi.string().allow(""))
	),
});
