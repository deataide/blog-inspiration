import client from "../config/client";
import { generateToken } from "../utils/generateToken";
import base64url from "base64url";
import nodemailer from "nodemailer";

const sendPasswordChangeEmail = async (email: string):Promise<String> => {
  const user = await client.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new Error("User doesn't exist.");
  }

  const token = generateToken(user.id, true);

  await client.user.update({
    where: {
      id: user.id,
    },
    data: {
      recuperation_token: token,
    },
  });

  const encodedToken = base64url(token);

  const transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Recuperação de Conta",
    text: "",
    html: `
          <p>Você solicitou a recuperação de senha. Clique no link abaixo para redefinir sua senha.</p>
          <a href="http://localhost:5173/new-password/${encodedToken}">Redefinir Senha</a>
        `,
  });

  return "A message has been sent to your email";
};

export { sendPasswordChangeEmail };
