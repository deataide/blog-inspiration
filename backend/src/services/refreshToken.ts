import client from "../config/client";
import { generateToken } from "../utils/generateToken";
import { generateRefreshToken } from "../utils/generateRefreshToken";
import dayjs from "dayjs";

const refreshToken = async (refresh_token: string) => {
  const refreshToken = await client.refreshToken.findFirst({
    where: {
      id: refresh_token,
    },
  });
  if (!refreshToken) throw new Error("refresh token invalid");

  const refreshTokenExpired = dayjs().isAfter(
    dayjs.unix(refreshToken.expiresIn)
  );

  const token = generateToken(refreshToken.userId, false);

  if (refreshTokenExpired) {
    await client.refreshToken.deleteMany({
      where: {
        userId: refreshToken.userId,
      },
    });

    const newRefreshToken = generateRefreshToken(refreshToken.id);

    return { token, newRefreshToken };
  }

  return { token };
};

export {refreshToken}