import client from "../config/client";

const getUserById = async (id: string) => {
  if (!id) throw new Error("id missing");

  const user = await client.user.findFirst({
    where: {
      id: id,
    },
  });

  return { user };
};

export { getUserById };
