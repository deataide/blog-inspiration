import client from '../config/client'
import dayjs from "dayjs";

const generateRefreshToken = async (userId: string) => {

  const expiresIn = dayjs().add(15, "second").unix();
  const generateRefreshToken = await client.refreshToken.create({
    data: {
      userId,
      expiresIn,
    },
  });
  return { generateRefreshToken };
};

export { generateRefreshToken };
