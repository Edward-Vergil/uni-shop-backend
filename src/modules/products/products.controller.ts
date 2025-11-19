import { Request, Response } from "express";
import { prisma } from "../../config/db";

export async function getProducts(req: Request, res: Response) {
  const { categoryId, brandId } = req.query;

  const where: any = { deletedAt: null };

  if (categoryId) where.categoryId = parseInt(categoryId as string, 10);
  if (brandId) where.brandId = parseInt(brandId as string, 10);

  const products = await prisma.product.findMany({
    where,
    orderBy: { id: "asc" },
  });

  res.json(products);
}

export async function getProductById(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);

  const product = await prisma.product.findFirst({
    where: { id, deletedAt: null },
  });

  if (!product) return res.status(404).json({ message: "Product not found" });

  res.json(product);
}

export async function createProduct(req: Request, res: Response) {
  const {
    name,
    description,
    sku,
    price,
    oldPrice,
    categoryId,
    brandId,
    images,
    isActive,
  } = req.body as {
    name: string;
    description?: string;
    sku: string;
    price: number;
    oldPrice?: number;
    categoryId: number;
    brandId: number;
    images?: string[];
    isActive?: boolean;
  };

  if (!name || !sku || price == null || !categoryId || !brandId) {
    return res
      .status(400)
      .json({ message: "name, sku, price, categoryId, brandId are required" });
  }

  const product = await prisma.product.create({
    data: {
      name,
      description,
      sku,
      price,
      oldPrice,
      categoryId,
      brandId,
      images: images ?? [],
      isActive: isActive ?? true,
    },
  });

  res.status(201).json(product);
}

export async function updateProduct(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);

  const {
    name,
    description,
    sku,
    price,
    oldPrice,
    categoryId,
    brandId,
    images,
    isActive,
  } = req.body as {
    name?: string;
    description?: string;
    sku?: string;
    price?: number;
    oldPrice?: number;
    categoryId?: number;
    brandId?: number;
    images?: string[];
    isActive?: boolean;
  };

  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        sku,
        price,
        oldPrice,
        categoryId,
        brandId,
        images,
        isActive,
      },
    });

    res.json(product);
  } catch {
    res.status(404).json({ message: "Product not found" });
  }
}

export async function softDeleteProduct(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);

  try {
    await prisma.product.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        isActive: false,
      },
    });

    res.status(204).send();
  } catch {
    res.status(404).json({ message: "Product not found" });
  }
}
