import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
const key = process.env.SECRET_KEY as string;

const authorization = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];
  if (!token || !token.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Token de acesso inválido ou ausente." });
  }
  const tokenWithoutBearer = token.split(" ");
  try {
    verify(tokenWithoutBearer[1], key, {
      algorithms: ["HS512"],
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Falha na autenticação." });
  }
};

export default authorization;
