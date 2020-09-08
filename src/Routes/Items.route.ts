import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Item } from '../entity/Item';
import { ItemSchema, ItemPatchSchema } from '../Schemas/Items';

const router = require('express').Router();

router.get('', async (req: Request, res: Response): Promise<Response> => {
    let items = await getRepository(Item).find();

    if (req.query.startDate) {
        const startDate = new Date(<string>req.query.startDate);
        items = items.filter(item => new Date(item.dueDate) > startDate);
    }
    if (req.query.endDate) {
        const endDate = new Date(<string>req.query.endDate);
        items = items.filter(item => new Date(item.dueDate) < endDate);
    }
    if (req.query.status) {
        items = items.filter(item => item.status == JSON.parse(<string>req.query.status));
    }

    return res.status(200).send(items);
});

router.post("", async (req: Request, res: Response): Promise<Response> => {
    const validation = ItemSchema.validate(req.body);

    if (validation.error) {
        return res.status(400).send(validation);
    }

    const createdItem = getRepository(Item).create(validation.value);
    const result = await getRepository(Item).save(validation.value);

    return res.status(201).send(result);
});

// router.put("/:id", (req, res) => {
//     const validation = ItemSchema.validate(req.body);

//     if (validation.error) {
//         res.status(400).send(validation);
//     }

//     let item = itemsList.find((elem) => elem.id == req.params.id);
//     // item.owner = req.body.owner;
//     item.description = req.body.description;
//     item.status = req.body.status;
//     item.dueDate = req.body.dueDate;

//     res.status(200).send(item);

// })

// router.patch("/:id", async (req, res) => {
//     const validation = ItemPatchSchema.validate(req.body);
//     if (validation.error) {
//         res.status(400).send(validation);
//     }

//     let itemSelected = await Item.findByPk(req.params.id);

//     if (itemSelected === null) {
//         res.status(404).send("Not found")
//     }

//     // for (const element in req.body) {
//     //     console.log(`${element}`)
//     //     if (req.body.hasOwnProperty(element)) {
//     //         itemSelected.update({
//     //             "element": req.body[element]
//     //         })
//     //     }
//     // }

//     if (validation.value.description) {
//         itemSelected.update({
//             "description": validation.value.description
//         })
//     }
//     if (validation.value.status) {
//         itemSelected.update({
//             "status": validation.value.status
//         })
//     }
//     if (validation.value.dueDate) {
//         itemSelected.update({
//             "dueDate": validation.value.dueDate
//         })
//     }

//     res.status(200).send(itemSelected)

// });


export default router;