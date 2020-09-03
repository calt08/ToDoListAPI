const Joi = require("joi");

// class Items {
//     constructor(id, owner, description, status, dueDate) {
//         this.id = id;
//         this.owner = owner;
//         this.description = description;
//         this.status = status;
//         this.dueDate = dueDate;
//     }
// }

const ItemSchema = Joi.object().keys({
    id: Joi.number().required(),
    owner: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.bool().required(),
    dueDate: Joi.date().required()
})


module.exports = { ItemSchema };