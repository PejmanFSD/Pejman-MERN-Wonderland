const Joi = require('joi');

module.exports.adSchema = Joi.object({
    ad: Joi.object({
        company: Joi.string().required(),
        text: Joi.string().required().max(250),
        image: Joi.string().required()
    }).required()
});