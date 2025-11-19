import { Router } from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoriesTree,
} from "./categories.controller";
import { authMiddleware } from "../../middleware/auth";
import { isAdmin } from "../../middleware/isAdmin";

const router = Router();

router.get("/", getCategories);
router.get("/tree", getCategoriesTree);

router.post("/", authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);

export default router;
