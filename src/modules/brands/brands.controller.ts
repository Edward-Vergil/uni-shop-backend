import { Request, Response } from "express";
import { prisma } from "../../config/db";

export async function getBrands(req: Request, res: Response) {
  const brands = await prisma.brand.findMany({
    orderBy: { id: "asc" },
  });

  res.json(brands);
}

export async function createBrand(req: Request, res: Response) {
  const { name, description, logoImageUrl, isActive } = req.body as {
    name: string;
    description?: string;
    logoImageUrl?: string;
    isActive?: boolean;
  };

  if (!name) {
    return res.status(400).json({ message: "name is required" });
  }

  const brand = await prisma.brand.create({
    data: {
      name,
      description,
      logoImageUrl,
      isActive: isActive ?? true,
    },
  });

  res.status(201).json(brand);
}

export async function updateBrand(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);
  const { name, description, logoImageUrl, isActive } = req.body as {
    name?: string;
    description?: string;
    logoImageUrl?: string;
    isActive?: boolean;
  };

  try {
    const brand = await prisma.brand.update({
      where: { id },
      data: {
        name,
        description,
        logoImageUrl,
        isActive,
      },
    });

    res.json(brand);
  } catch (e) {
    res.status(404).json({ message: "Brand not found" });
  }
}

export async function deleteBrand(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);

  try {
    await prisma.brand.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (e) {
    res.status(404).json({ message: "Brand not found" });
  }
}
