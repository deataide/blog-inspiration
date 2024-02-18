import { Request, Response } from "express";
import { createUser } from "../services/createUser";

export const createUserController = async (req: Request, res: Response) => {
  const { email, name, password, admin, imageUrl } = req.body;

  const user = await createUser({ email, name, password, admin, imageUrl });

  return res.json(user);
};
