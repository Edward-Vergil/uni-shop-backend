import { Request, Response } from "express";
import { prisma } from "../../config/db";

export async function getCategories(req: Request, res: Response) {
  const categories = await prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });

  res.json(categories);
}


export async function createCategory(req: Request, res: Response) {
  const { name, description, parentId, imageUrl, sortOrder } = req.body as {
    name: string;
    description?: string;
    parentId?: number;
    imageUrl?: string;
    sortOrder?: number;
  };

  if (!name) {
    return res.status(400).json({ message: "name is required" });
  }

  const category = await prisma.category.create({
    data: {
      name,
      description,
      imageUrl,
      sortOrder: sortOrder ?? 0,
      parentId: parentId ?? null,
    },
  });

  res.status(201).json(category);
}

export async function updateCategory(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);
  const { name, description, parentId, imageUrl, sortOrder } = req.body as {
    name?: string;
    description?: string;
    parentId?: number | null;
    imageUrl?: string;
    sortOrder?: number;
  };

  try {
    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
        description,
        parentId,
        imageUrl,
        sortOrder,
      },
    });

    res.json(category);
  } catch {
    res.status(404).json({ message: "Category not found" });
  }
}

export async function deleteCategory(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);

  try {
    await prisma.category.delete({
      where: { id },
    });

    res.status(204).send();
  } catch {
    res.status(404).json({ message: "Category not found" });
  }
}

export async function getCategoriesTree(req: Request, res: Response) {
  const categories = await prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });

  const map = new Map<number, any>();
  const roots: any[] = [];

  for (const cat of categories) {
    map.set(cat.id, { ...cat, children: [] as any[] });
  }

  for (const cat of categories) {
    const node = map.get(cat.id);
    if (cat.parentId == null) {
      roots.push(node);
    } else {
      const parent = map.get(cat.parentId);
      if (parent) {
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    }
  }

  res.json(roots);
}
