import client from "../config/client";

const editPost = async (
  id: string,
  title?: string,
  content?: string,
  published?: boolean
) => {
  const post = await client.post.findFirst({
    where: {
      id: id,
    },
  });

  if (!post) throw new Error("User doesnt exists");

  const updatePost = await client.post.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      content: content,
      published: published,
    },
  });

  return { updatePost };
};

export { editPost };
