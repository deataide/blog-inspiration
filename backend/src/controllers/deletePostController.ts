import { deletePost } from "../services/deletePost";
import { Request, Response } from "express";

export const deletePostController = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) throw new Error("type a id");

  const post = await deletePost({ id });

  return res.json(post);
};
