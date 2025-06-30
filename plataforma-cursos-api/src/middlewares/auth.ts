import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "chave-secreta-supersegura";


declare global {
  namespace Express {
    interface Request {
      usuario?: any;
    }
  }
}

const autenticar = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies?.jwt;

  if (!token) {
    res.status(401).json({ mensagem: "Token não encontrado. Faça login." });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(401).json({ mensagem: "Token inválido ou expirado" });
  }
};

export default autenticar;
