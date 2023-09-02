const Joi = require("joi");

exports.testUpdateValidator = Joi.object({
	testName: Joi.string(),
	duration: Joi.number().integer(),
	language: Joi.string().valid("HINDI", "ENGLISH"),
	instruction: Joi.string(),
});
