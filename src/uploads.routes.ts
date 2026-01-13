import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  return res.status(200).json({
    message: "Upload endpoint works (stub)",
  });
});

export default router;
