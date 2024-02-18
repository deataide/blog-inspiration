import { getUserById } from "../services/getUserById";
import { Request, Response } from "express";

export const getUserByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = getUserById(id);

  return res.json({ user });
};
