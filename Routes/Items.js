const router = require("express").Router();
const { ItemSchema } = require("../Schemas/Items");
// const Joi = require("joi");
const { Item } = require("../models");

router.get("", async (req, res) => {
    const items = await Item.findAll();

    res.status(200).send(items);
});

router.post("", async (req, res) => {
    const validation = ItemSchema.validate(req.body);

    if (validation.error) {
        res.status(400).send(validation);
    }

    const createdItem = await Item.create(validation.value);

    res.status(201).send(createdItem);
});

router.put("/:id", (req, res) => {
    const validation = ItemSchema.validate(req.body);

    if (validation.error) {
        res.status(400).send(validation);
    }

    let item = itemsList.find((elem) => elem.id == req.params.id);
    item.owner = req.body.owner;
    item.description = req.body.description;
    item.status = req.body.status;
    item.dueDate = req.body.dueDate;

    res.status(200).send(item);

})

module.exports = router;
