const Joi = require('joi');
const { Languages } = require('../utils/Languages');

exports.courseCreateValidator = Joi.object({
  courseName: Joi.string().required(),
  courseDescription: Joi.string().required(),
  price: Joi.number().integer().min(0).required(),
  whatYouGet: Joi.array().items(Joi.string()),
  youtubeLink: Joi.string().allow(''),
  language: Joi.string()
    .valid(...Object.values(Languages))
    .default(Languages.HINDI),
  defaultValidityDuration: Joi.number().integer().required(),
});

exports.courseUpdateValidator = Joi.object({
  courseName: Joi.string().min(3).max(255).optional(),
  courseDescription: Joi.string().max(1000).optional(),
  price: Joi.number().integer().min(0).optional(),
  images: Joi.string().optional(),
  whatYouGet: Joi.array().items(Joi.string()).optional(),
  youtubeLink: Joi.string().optional(),
  language: Joi.string().valid('HINDI', 'ENGLISH').optional(),
  isFeatured: Joi.boolean().optional(),
  defaultValidityDuration: Joi.number().integer().min(1).optional(),
});
