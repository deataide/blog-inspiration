import { Request, Response } from "express";
import { deleteUser } from "../services/deleteUser";

export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) throw new Error("type a id");

  const user = await deleteUser({ id });

  return res.json(user);
};
