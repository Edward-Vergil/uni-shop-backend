import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  softDeleteProduct,
} from "./products.controller";
import { authMiddleware } from "../../middleware/auth";
import { isAdmin } from "../../middleware/isAdmin";

const router = Router();

// публичные
router.get("/", getProducts);
router.get("/:id", getProductById);

// админские
router.post("/", authMiddleware, isAdmin, createProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, softDeleteProduct);

export default router;
