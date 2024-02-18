import client from "../config/client";

const getPost = async () => {
  const posts = await client.post.findMany({
    where: {
      published: true,
    },
  });

  return { posts };
};

export { getPost };
