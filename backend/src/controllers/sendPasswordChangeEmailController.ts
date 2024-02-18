import { Request, Response } from "express";
import { sendPasswordChangeEmail } from "../services/sendPasswordChangeEmail";

export const sendPasswordChangeEmailController = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;

  const sendedEmail = await sendPasswordChangeEmail(email);

  return res.json(sendedEmail);
};
