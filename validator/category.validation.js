const Joi = require("joi");

exports.categoryValidator = Joi.object({
	categoryName: Joi.string()
		.regex(/^\s*[A-Z\s]+\s*$/)
		.error(
			new Error(
				"Category name must be in all capital letters and may contain multiple words separated by spaces."
			)
		),
});
