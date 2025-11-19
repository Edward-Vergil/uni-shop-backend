import { Router } from "express";
import { getUsers, updateUserRole } from "./users.controller";
import { authMiddleware } from "../../middleware/auth";
import { isAdmin } from "../../middleware/isAdmin";

const router = Router();

router.get("/users", authMiddleware, isAdmin, getUsers);
router.put("/users/:id", authMiddleware, isAdmin, updateUserRole);

export default router;
