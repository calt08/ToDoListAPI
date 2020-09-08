import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Item } from '../entity/Item';
import { ItemSchema, ItemPatchSchema } from '../Schemas/Items';
import { User } from '../entity/User';

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

    const user = await getRepository(User).findOne(parseInt(<string>req.query.userId));
    validation.value.user = user; // Added the user to the object

    const newItem = getRepository(Item).create(validation.value);
    const result = await getRepository(Item).save(newItem);

    return res.status(201).send(newItem);
});

router.put("/:id", async (req: Request, res: Response): Promise<Response> => {
    const validation = ItemSchema.validate(req.body);
    if (validation.error) {
        return res.status(400).send(validation);
    }

    let itemSelected = await getRepository(Item).findOne(parseInt(<string>req.params.id));
    if (itemSelected) {
        const itemUpdated = getRepository(Item).merge(itemSelected, req.body);
        const result = await getRepository(Item).save(itemUpdated);
        return res.status(200).send(result);
    } else {
        return res.status(404).send('Item not found');
    }
})

// router.patch("/:id", async (req, res) => {
//     const validation = ItemPatchSchema.validate(req.body);
//     if (validation.error) {
//         res.status(400).send(validation);
//     }

//     let itemSelected = await getRepository(Item).findOne(parseInt(<string>req.params.id));

//     if (itemSelected === null) {
//         res.status(404).send("Not found")
//     }

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