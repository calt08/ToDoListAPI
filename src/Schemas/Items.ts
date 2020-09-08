import * as Joi from "joi";

export const ItemSchema = Joi.object().keys({
    // ownerId: Joi.number().positive().required(),
    description: Joi.string().required(),
    status: Joi.bool().required(),
    dueDate: Joi.date().required()
})

export const ItemPatchSchema = Joi.object().keys({
    description: Joi.string(),
    status: Joi.bool(),
    dueDate: Joi.date()
})



// module.exports = { ItemSchema, ItemPatchSchema };