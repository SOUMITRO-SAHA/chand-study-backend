const Joi = require("joi");
const { Languages } = require("../utils/Languages");

exports.lectureCreateValidator = Joi.object({
	lectureName: Joi.string().required(),
	lectureDescription: Joi.string().required(),
	youtubeLink: Joi.string().allow(""),
	language: Joi.string()
		.valid(...Object.values(Languages))
		.default(Languages.HINDI),
});

exports.lectureUpdateValidator = Joi.object({
	lectureName: Joi.string(),
	lectureDescription: Joi.string(),
	youtubeLink: Joi.string().allow(""),
	language: Joi.string()
		.valid(...Object.values(Languages))
		.default(Languages.HINDI),
});
