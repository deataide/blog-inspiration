import client from "../config/client";
import { compare } from "bcrypt";
import { generateToken } from "../utils/generateToken";
import { generateRefreshToken } from "../utils/generateRefreshToken";

interface IRequest {
  email: string;
  password: string;
}

const authenticateUser = async ({ email, password }: IRequest) => {
  const userExists = await client.user.findFirst({
    where: {
      email,
    },
  });

  if (!userExists) throw new Error("user or password are incorrect");

  const passwordMatch = await compare(password, userExists.password);

  if (!passwordMatch) throw new Error("user or password are incorrect");

  const token = generateToken(userExists.id, false);

  await client.refreshToken.deleteMany({
    where: {
      userId: userExists.id,
    },
  });

  const refreshToken = generateRefreshToken(userExists.id);

  return { _id: userExists.id, token, refreshToken };
};

export { authenticateUser };
