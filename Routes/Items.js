const router = require("express").Router();
const { Items, ItemSchema } = require("../Models/Items");
const Joi = require("joi");

itemsList = [];

router.get("", (req, res) => {
    // let test = new Items(1, "Dejim", "Test", true, "13443234");
    // console.log(test);
    res.status(200).send(itemsList);
});

router.post("", (req, res) => {
    const validation = ItemSchema.validate(req.body);

    if (validation.error) {
        res.status(400).send(validation);
    }

    let item = new Items(req.body.id, req.body.owner, req.body.description, req.body.status, req.body.dueDate);
    itemsList.push(item);
    res.status(201).send(item);
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
