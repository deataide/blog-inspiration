import client from "../config/client";
import multer from "multer";
interface PostData {
  title: string;
  author: string;
  content?: string;
  images: any;
}

async function createPostService(postData: PostData) {
  try {
    const { title, author, content, images } = postData;

    if (!title || !author) {
      throw new Error('Todos os campos (title, author, content, images) são obrigatórios.');
    }

    // Cria o post no banco de dados
    const post = await client.post.create({
      data: {
        title,
        content,
        author: {
          connect: {
            id: author,
          },
        },
        images: {
          create: images
        }
      },
      select: {
        title: true,
        images: true,
        content: true,
        authorId: true
      }
    });

    return post;
  } catch (error) {
    console.log(error)
    throw new Error('Ocorreu um erro ao criar o post. Por favor, tente novamente.');
  }
}

export { createPostService };
