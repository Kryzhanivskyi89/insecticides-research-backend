import express from "express";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware.js";
import {
  getAllActs,
  registerAct,
  saveResults,
  updateAct,
  getActById,
} from "../controllers/actController.js";

const router = express.Router();

router.post("/register", authenticate, authorizeRoles("admin", "worker"), registerAct);
router.post("/results/:id", authenticate, authorizeRoles("admin", "worker"), saveResults);
router.put("/:id", authenticate, authorizeRoles("admin", "worker"), updateAct);

router.get("/", authenticate, authorizeRoles("admin", "worker", "viewer"), getAllActs);
router.get("/:id", authenticate, authorizeRoles("admin", "worker", "viewer"), getActById);

export default router;