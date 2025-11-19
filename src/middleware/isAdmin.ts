import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth";

export function isAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Forbidden: admin only" });
  }
  next();
}
