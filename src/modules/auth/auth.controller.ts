import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/db";
import { env } from "../../config/env";
import { RegisterDto, LoginDto } from "./auth.dto";

const SALT_ROUNDS = 10;

export async function register(req: Request, res: Response) {
  const { email, password, name } = req.body as RegisterDto;

  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: "email, password, name are required" });
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res
      .status(409)
      .json({ message: "User with this email already exists" });
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: { email, passwordHash, name },
    select: { id: true, email: true, name: true, role: true },
  });

  return res.status(201).json(user);
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body as LoginDto;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "email and password are required" });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return res.json({ token });
}
