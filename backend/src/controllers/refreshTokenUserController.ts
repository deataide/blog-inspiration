import { Request, Response } from "express";
import { refreshToken } from "../services/refreshToken";

export const refreshTokenUserController = async (
  req: Request,
  res: Response
) => {
  const { refresh_token } = req.body;

  const token = await refreshToken(refresh_token);

  return res.json(token);
};
