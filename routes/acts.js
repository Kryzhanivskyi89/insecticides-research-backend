import express from "express";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware.js";
import Act from "../models/Act.js";

const router = express.Router();

// Отримати всі акти (всі ролі)
router.get("/", authenticate, authorizeRoles("admin", "worker", "viewer"), async (req, res) => {
  const acts = await Act.find().sort({ createdAt: -1 });
  res.json(acts);
});

// Створити новий акт (тільки admin і worker)
router.post("/", authenticate, authorizeRoles("admin", "worker"), async (req, res) => {
  const act = await Act.create({ ...req.body, createdBy: req.user.userId });
  res.status(201).json(act);
});

export default router;