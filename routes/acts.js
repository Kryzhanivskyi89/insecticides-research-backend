import express from "express";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware.js";
import Act from "../models/Act.js";

const router = express.Router();

// // Отримати всі акти (всі ролі)
// router.get("/", authenticate, authorizeRoles("admin", "worker", "viewer"), async (req, res) => {
//   const acts = await Act.find().sort({ createdAt: -1 });
//   res.json(acts);
// });

// // Створити новий акт (тільки admin і worker)
// router.post("/", authenticate, authorizeRoles("admin", "worker"), async (req, res) => {
//   const act = await Act.create({ ...req.body, createdBy: req.user.userId });
//   res.status(201).json(act);
// });

// POST /api/acts/results/:id

// POST /api/acts/register
// POST /api/acts/register
router.post("/register", authenticate, authorizeRoles("admin", "worker"), async (req, res) => {
  try {
    const { actInfo = {}, samples = [] } = req.body;

    const newAct = new Act({
      actNumber: actInfo.actNumber || "",
      year: actInfo.year || "",
      actDate: actInfo.actDate || "",
      receivedDate: actInfo.receivedDate || "",
      transferredBy: actInfo.transferredBy || "",
      executor: actInfo.executor || "", // нове поле
      samples,
      createdBy: req.user.userId,
    });

    const savedAct = await newAct.save();
    res.status(201).json(savedAct);
  } catch (error) {
    console.error("Помилка при створенні акту:", error);
    res.status(500).json({ message: "Не вдалося створити акт" });
  }
});

// POST /api/acts/results/:id
router.post("/results/:id", authenticate, authorizeRoles("admin", "worker"), async (req, res) => {
  try {
    const { id } = req.params;
    const { control, samplesData, plantingDate, activityData, conclusion } = req.body;

    const act = await Act.findById(id);
    if (!act) {
      return res.status(404).json({ message: "Акт не знайдено" });
    }

    act.experiment = {
      ...act.experiment,
      control: control || {},
      samplesData: samplesData || [],
      layingDate: plantingDate || "",
    };

    act.activityData = activityData || [];
    act.conclusion = conclusion || "";

    const updatedAct = await act.save();

    res.status(200).json(updatedAct);
  } catch (error) {
    console.error("Помилка при збереженні результатів:", error);
    res.status(500).json({ message: "Не вдалося зберегти результати" });
  }
});

export default router;