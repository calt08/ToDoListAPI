const Joi = require("joi");

const ItemSchema = Joi.object().keys({
    // id: Joi.number().required(),
    ownerId: Joi.number().positive().required(),
    description: Joi.string().required(),
    status: Joi.bool().required(),
    dueDate: Joi.date().required()
})


module.exports = { ItemSchema };