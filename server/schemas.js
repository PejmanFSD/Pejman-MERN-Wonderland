const Joi = require('joi');

module.exports.adSchema = Joi.object({
    ad: Joi.object({
        text: Joi.string().required().max(250),
        image: Joi.string().required()
    }).required()
});

module.exports.companySchema = Joi.object({
    company: Joi.object({
        text: Joi.string().required(),
    }).required()
});