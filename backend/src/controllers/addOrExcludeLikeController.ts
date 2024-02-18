import { Request, Response } from "express";
import { handleLike } from "../services/addAndExcludeLike";

export const addOrExcludeLikeController = async (
  req: Request,
  res: Response
) => {
  const { userId, postId } = req.params;

  const like = await handleLike( userId, postId );

  return res.json(like);
};
