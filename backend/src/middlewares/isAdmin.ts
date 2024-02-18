import { Request, Response, NextFunction } from 'express';
import client from '../config/client';
import jwt from "jsonwebtoken";

const isAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {

  const bearerHeader = req.headers["authorization"];
  let userId = ''

  if (!bearerHeader) {
    return res.status(401).json({ mensagem: "Token Invalid" });
  }

  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];
  // eslint-disable-next-line no-undef
  const secret = process.env.AUTH_SECRET || "NONE";

  const decodedToken = jwt.verify(bearerToken, secret, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ error: err.message });
    }
     userId = decoded.id; 
  });
  
  const user = await client.user.findFirst({where:{
    id:userId
  }})

  if (user && user.admin) {
    next();
  } else {
    return res.status(403).json({ message: 'Acesso não autorizado: você não é um administrador.' });
  }
};


export { isAdminMiddleware };
