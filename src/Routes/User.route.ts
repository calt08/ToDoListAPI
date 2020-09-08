import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Request, Response } from "express";

const router = require("express").Router();

router.post("/register", async (req: Request, res: Response): Promise<Response> => {
    const newUser = getRepository(User).create({ email: "test@test.com", password: 'test123' });
    const result = await getRepository(User).save(newUser);

    return res.status(201).send(result);

});


export default router;