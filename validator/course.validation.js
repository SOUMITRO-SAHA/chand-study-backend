const Joi = require("joi");

const courseCreateValidator = Joi.object({
	courseName: Joi.string().required(),
	courseDescription: Joi.string().required(),
	price: Joi.number().integer().min(0).required(),
	whatYouGet: Joi.array().items(Joi.string()),
	youtubeLink: Joi.string().allow(""),
});

module.exports = courseCreateValidator;
