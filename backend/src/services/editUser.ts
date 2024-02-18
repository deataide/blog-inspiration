import client from "../config/client";

const editUser = async (
  id: string,
  email?: string,
  password?: string,
  name?: string
) => {
  const user = await client.user.findFirst({
    where: {
      id: id,
    },
  });

  if (!user) throw new Error("user doesnt exists");

  const updateUser = await client.user.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      email: email,
      password: password,
    },
  });

  return { updateUser };
};

export {editUser}