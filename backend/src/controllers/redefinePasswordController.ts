import { Request, Response } from "express";
import { redefinePassword } from "../services/redefinePassword";

export const redefinePasswordController = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;
  const { token} = req.params;

  const newPassword = await redefinePassword(email, token);

  return res.json(newPassword);
};
