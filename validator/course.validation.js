const Joi = require("joi");
const { Languages } = require("../utils/Languages");

exports.courseCreateValidator = Joi.object({
	courseName: Joi.string().required(),
	courseDescription: Joi.string().required(),
	price: Joi.number().integer().min(0).required(),
	whatYouGet: Joi.array().items(Joi.string()),
	youtubeLink: Joi.string().allow(""),
	language: Joi.string()
		.valid(...Object.values(Languages))
		.default(Languages.HINDI),
});

exports.sectionCrateValidator = Joi.object({
	title: Joi.string().required(),
	marks: Joi.number().positive().required(),
	negativeMarking: Joi.number().positive().required(),
	canSkip: Joi.boolean().default(false),
	minQuestionsToAdvance: Joi.number().integer().positive().allow(null),
	testId: Joi.number().positive().required(),
});

exports.questionCreateValidator = Joi.object({
	content: Joi.string().required(),
	options: Joi.array().items(Joi.string()).required(),
	correctAnswer: Joi.string().required(),
	marks: Joi.number().positive().required(),
	negativeMarking: Joi.number().positive().required(),
	sectionId: Joi.number().positive().required(),
});

exports.testCreateSchema = Joi.object({
	testName: Joi.string().required(),
	duration: Joi.number().positive().required(),
	sections: Joi.array().items(this.sectionCrateValidator).min(1).required(),
	courseId: Joi.number().positive().required(),
});
