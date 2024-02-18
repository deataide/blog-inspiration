import { Request, Response } from "express";
import { authenticateUser } from "../services/authenticateUser";

export const authenticatedUserController = async (
  req: Request,
  res: Response
) => {
  const { email, password } = req.body;

  const token = await authenticateUser({ email, password });

  return res.json(token);
};
