import { Router } from "express";
import {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} from "./brands.controller";
import { authMiddleware } from "../../middleware/auth";
import { isAdmin } from "../../middleware/isAdmin";

const router = Router();

// публичный список брендов
router.get("/", getBrands);

// ниже — только админ
router.post("/", authMiddleware, isAdmin, createBrand);
router.put("/:id", authMiddleware, isAdmin, updateBrand);
router.delete("/:id", authMiddleware, isAdmin, deleteBrand);

export default router;
