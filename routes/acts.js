import express from "express";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware.js";
import {
  getAllActs,
  registerAct,
  saveResults,
  updateAct,
} from "../controllers/actController.js";

const router = express.Router();

router.get("/", authenticate, authorizeRoles("admin", "worker", "viewer"), getAllActs);
router.post("/register", authenticate, authorizeRoles("admin", "worker"), registerAct);
router.post("/results/:id", authenticate, authorizeRoles("admin", "worker"), saveResults);
router.put("/:id", authenticate, authorizeRoles("admin", "worker"), updateAct);

export default router;