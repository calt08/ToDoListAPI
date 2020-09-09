import * as Joi from "joi";

export const UserSchema = Joi.object().keys({
    description: Joi.string().required(),
    status: Joi.bool().required(),
    dueDate: Joi.date().required()
})