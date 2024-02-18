import { getPost } from "../services/getPost";
import { Request, Response } from "express";

export const getPostController = async (req: Request, res: Response) => {
  const posts = await getPost();

  return res.json(posts);
};
