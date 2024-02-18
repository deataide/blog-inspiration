import client from "../config/client";
import { hash } from "bcrypt";

interface UserRequest {
  email: string;
  name: string;
  password: string;
  admin: boolean;
  imageUrl?: string;
}

const createUser = async ({ email, name, password, admin=false, imageUrl }: UserRequest) => {
  const userAlreadyExists = await client.user.findFirst({
    where: {
      email: email,
    },
  });

  if (userAlreadyExists) {
    throw new Error("user already exists");
  }

  if(!email || !name || !password){
    throw new Error("Missing data")
  }

  const hashPassword =await hash(password, 8);

  const user = await client.user.create({
    data: {
      email,
      name,
      password: hashPassword,
      admin: admin,
      imageUrl: imageUrl
    },
  });

  return { user };
};

export {createUser}