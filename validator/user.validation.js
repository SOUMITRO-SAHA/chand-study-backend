const Joi = require("joi");

exports.sigUpWithPhoneValidator = Joi.object({
	userName: Joi.string().required(),
	phoneNumber: Joi.string()
		.pattern(/^[0-9]+$/, "numbers")
		.min(10)
		.max(10)
		.required(),
	email: Joi.string().required(),
});

exports.loginWithPhoneValidator = Joi.object({
	phoneNumber: Joi.string()
		.pattern(/^[0-9]+$/, "numbers")
		.min(10)
		.max(10)
		.required(),
});
