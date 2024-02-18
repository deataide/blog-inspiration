import client from "../config/client";

interface DeleteInfo {
  id: string;
}

const deletePost = async ({ id }: DeleteInfo) => {
  const deletedRow = await client.post.delete({
    where: {
      id: id,
    },
  });

  const postExists = await client.user.findFirst({
    where: {
      id: id,
    },
  });

  if (!postExists) return "user dont exists or deleted";
};

export { deletePost };
