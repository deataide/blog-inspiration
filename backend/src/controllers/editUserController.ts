import { editUser } from "../services/editUser";
import { Request, Response } from "express";

export const editUserController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = editUser(id, name, email, password);

    return res.json(user);
};
