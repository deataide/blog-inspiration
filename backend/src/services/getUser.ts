import client from "../config/client";

export const getUser = async () => {
  const users = await client.user.findMany({
    select:{
      id: true,
      name: true,
      email: true,
      posts: true
    }
  });

  return { users };
};
