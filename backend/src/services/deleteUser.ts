import client from "../config/client";

interface DeleteInfo {
  id: string;
}

const deleteUser = async ({ id }: DeleteInfo) => {
  const deletedRow = await client.user.delete({
    where: {
      id: id,
    },
  });

  const userExists = await client.user.findFirst({
    where: {
      id: id,
    },
  });

  if (!userExists) return "user dont exists or deleted";
};

export { deleteUser };
