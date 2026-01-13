import express from "express";
import cors from "cors";
import path from "path";

import authRoutes from "./modules/auth/auth.routes";
import adminUserRoutes from "./modules/users/users.routes";
import brandsRoutes from "./modules/brands/brands.routes";
import categoriesRoutes from "./modules/categories/categories.routes";
import productsRoutes from "./modules/products/products.routes";
import uploadsRoutes from "./uploads.routes";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminUserRoutes);
app.use("/api/brands", brandsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/uploads", uploadsRoutes);

export default app;
