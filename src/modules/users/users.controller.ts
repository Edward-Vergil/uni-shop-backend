import { Response } from "express";
import { prisma } from "../../config/db";
import { AuthRequest } from "../../middleware/auth";

export async function getUsers(req: AuthRequest, res: Response) {
  const page = parseInt((req.query.page as string) || "1", 10);
  const limit = parseInt((req.query.limit as string) || "20", 10);
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: limit,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
      orderBy: { id: "asc" },
    }),
    prisma.user.count(),
  ]);

  res.json({
    items,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  });
}

export async function updateUserRole(req: AuthRequest, res: Response) {
  const id = parseInt(req.params.id, 10);
  const { role } = req.body as { role: "USER" | "ADMIN" };

  if (!["USER", "ADMIN"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const user = await prisma.user.update({
    where: { id },
    data: { role },
    select: { id: true, email: true, name: true, role: true },
  });

  res.json(user);
}
