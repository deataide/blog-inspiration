import { getUser } from "../services/getUser";
import { Request, Response } from "express";

export const getUserController = async (req: Request, res: Response) => {
  const users = await getUser();

  return res.json(users);
};
