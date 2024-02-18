import { Request, Response } from "express"; // Importa os tipos Request e Response de 'express'
import { createPostService } from "../services/createPost";

async function createPostController(req: Request, res: Response) {
  const { title, author, content } = req.body;
  const requestImages = req.files as Express.Multer.File[];

  const images = requestImages.map((image) => {
    return {
      path: image.filename,
    };
  });

  // Chama o serviço para criar o post
  const post = await createPostService({ title, author, content, images });

  // Retorna uma resposta de sucesso com o post criado
  return res.json(post);
}

export { createPostController };
