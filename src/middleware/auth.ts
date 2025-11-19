import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface AuthRequest extends Request {
  user?: { id: number; role: "USER" | "ADMIN"; email: string };
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("NO TOKEN OR WRONG FORMAT:", authHeader);
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as {
      id: number;
      role: "USER" | "ADMIN";
      email: string;
    };

    req.user = payload;
    next();
  } catch (e) {
    console.log("JWT ERROR:", (e as Error).message);
    return res.status(401).json({ message: "Invalid token" });
  }
}
