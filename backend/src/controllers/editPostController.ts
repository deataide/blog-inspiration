import { editPost } from "../services/editPost";
import { Request, Response } from "express";

export const editPostController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, published } = req.body;

  const post = await editPost(id, title, content, published);

  return res.json(post)
};
