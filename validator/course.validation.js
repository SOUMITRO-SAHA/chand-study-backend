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
	defaultValidityDuration: Joi.number().integer().required(),
});

exports.courseUpdateValidator = Joi.object({
	courseName: Joi.string().min(3).max(255),
	courseDescription: Joi.string().max(1000),
	price: Joi.number().integer().min(0),
	images: Joi.string(),
	whatYouGet: Joi.array().items(Joi.string()),
	youtubeLink: Joi.string(),
	language: Joi.string().valid("HINDI", "ENGLISH"),
	isFeatured: Joi.boolean(),
	defaultValidityDuration: Joi.number().integer().min(1),
});
