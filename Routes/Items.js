const router = require("express").Router();
const { ItemSchema, ItemPatchSchema } = require("../Schemas/Items");
const { Item } = require("../models");

router.get("", async (req, res) => {

    let items = await Item.findAll();

    if (req.query.startDate) {
        startDate = new Date(req.query.startDate);
        items = items.filter(item => item.dueDate > startDate);
    }
    if (req.query.endDate) {
        endDate = new Date(req.query.endDate);
        items = items.filter(item => item.dueDate < endDate);
    }
    if (req.query.status) {
        items = items.filter(item => item.status == JSON.parse(req.query.status));
    }

    res.status(200).send(items);


});

router.get("/test/:id", async (req, res) => {

    const items = await Item.findAll();

    let item = items.find((elem) => elem.id == req.params.id)

    res.status(200).send(item);
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
    // item.owner = req.body.owner;
    item.description = req.body.description;
    item.status = req.body.status;
    item.dueDate = req.body.dueDate;

    res.status(200).send(item);

})

router.patch("/:id", async (req, res) => {
    const validation = ItemPatchSchema.validate(req.body);
    if (validation.error) {
        res.status(400).send(validation);
    }

    let itemSelected = await Item.findByPk(req.params.id);

    if (itemSelected === null) {
        res.status(404).send("Not found")
    }

    // for (const element in req.body) {
    //     console.log(`${element}`)
    //     if (req.body.hasOwnProperty(element)) {
    //         itemSelected.update({
    //             "element": req.body[element]
    //         })
    //     }
    // }

    if (validation.value.description) {
        itemSelected.update({
            "description": validation.value.description
        })
    }
    if (validation.value.status) {
        itemSelected.update({
            "status": validation.value.status
        })
    }
    if (validation.value.dueDate) {
        itemSelected.update({
            "dueDate": validation.value.dueDate
        })
    }

    res.status(200).send(itemSelected)

});




module.exports = router;
