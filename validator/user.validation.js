const Joi = require("joi");

exports.sigUpWithPhoneValidator = Joi.object({
	userName: Joi.string().required(),
	email: Joi.string().required(),
	phoneNumber: Joi.string().min(10).max(10).required(),
});

exports.loginWithEmailValidator = Joi.object({
	email: Joi.string().required(),
});

exports.verifyEmailValidator = Joi.object({
	otp: Joi.number().required(),
	email: Joi.string().required(),
});

exports.loginWithPhoneValidator = Joi.object({
	phoneNumber: Joi.string().min(10).max(10).required(),
});
