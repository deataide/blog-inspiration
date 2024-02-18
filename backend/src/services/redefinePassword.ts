import jwt from "jsonwebtoken";
import "dotenv/config";
import base64url from "base64url";
import bcrypt from "bcrypt";

import client from "../config/client";

const redefinePassword = async (token: string, password: string):Promise<String> => {
  
    if (!password) {
      throw new Error("Type your new password");
    }
  
    try {
      const decodedToken = base64url.decode(token);
  
      if (!decodedToken || typeof decodedToken !== "string") {
        throw new Error("Invalid or missing token");
      }
  
      const secret = process.env.AUTH_SECRET || 'NONE';
  
      const user = await client.user.findFirst({
        where: {
          recuperation_token: decodedToken
        }
      });
  
      if (!user) {
        throw new Error("User not found");
      }
  
      try {
         jwt.verify(decodedToken, secret);
      } catch (error) {
        throw new Error(`Invalid session ${error}`);
      }
  
      const hashedPassword = await bcrypt.hash(password, Number(secret));
  
      await client.user.update({
        where: {
          id: user.id
        },
        data: {
          password: hashedPassword,
          recuperation_token: null
        }
      });
  
      return "Password changed successfully!";
    } catch (error) {
      throw new Error(`Internal Error ${error}`);
    }
  };
  
  export {redefinePassword}