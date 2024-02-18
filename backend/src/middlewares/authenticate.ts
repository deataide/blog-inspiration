import jwt from "jsonwebtoken";
import "dotenv/config";

export const authenticatedUserMiddleware = (req: any, res: any, next: any) => {
  const bearerHeader = req.headers["authorization"];

  try {
    if (!bearerHeader) {
      return res.status(401).json({ mensagem: "Token Invalid" });
    }

    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    // eslint-disable-next-line no-undef
    const secret = process.env.AUTH_SECRET || "NONE";

    jwt.verify(bearerToken, secret, (err: any) => {
      if (err) {
        return res.status(401).json({ error: err.message });
      }

      req.token = bearerToken;

      next();
    });
  } catch (error) {
    return res.status(403).json({ message: "Acesso não autorizado" });
  }
};
