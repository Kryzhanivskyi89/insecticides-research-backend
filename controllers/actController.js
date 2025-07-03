import Act from "../models/Act.js";

// Отримати всі акти
export const getAllActs = async (req, res) => {
  try {
    const acts = await Act.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });
    res.json(acts);
  } catch (err) {
    console.error("Помилка при отриманні актів:", err);
    res.status(500).json({ message: "Помилка сервера" });
  }
};

export const getActById = async (req, res) => {
  try {
    const { id } = req.params;
    const act = await Act.findById(id).populate("createdBy", "name");
    if (!act) return res.status(404).json({ message: "Акт не знайдено" });
    res.json(act);
  } catch (err) {
    console.error("Помилка при отриманні акту:", err);
    res.status(500).json({ message: "Помилка сервера" });
  }
};

// Створити або оновити акт за actNumber
export const registerAct = async (req, res) => {
  try {
    const { actInfo = {}, samples = [] } = req.body;
    const { actNumber } = actInfo;

    if (!actNumber) {
      return res.status(400).json({ message: "actNumber є обов'язковим" });
    }

    let act = await Act.findOne({ actNumber });

    if (act) {
      act.year = actInfo.year || act.year;
      act.actDate = actInfo.actDate || act.actDate;
      act.receivedDate = actInfo.receivedDate || act.receivedDate;
      act.transferredBy = actInfo.transferredBy || act.transferredBy;
      act.executor = actInfo.executor || act.executor;
      act.status = actInfo.status || act.status;
      act.samples = samples || act.samples;

      const updated = await act.save();
      return res.status(200).json({ created: false, act: updated });
    } else {
      const newAct = new Act({
        actNumber,
        year: actInfo.year || "",
        actDate: actInfo.actDate || "",
        receivedDate: actInfo.receivedDate || "",
        transferredBy: actInfo.transferredBy || "",
        executor: actInfo.executor || "",
        status: actInfo.status || "todo",
        samples,
        createdBy: req.user.userId,
      });

      const saved = await newAct.save();
      return res.status(201).json({ created: true, act: saved });
    }
  } catch (error) {
    console.error("Помилка при створенні/оновленні акту:", error);
    res.status(500).json({ message: "Помилка сервера" });
  }
};

// Зберегти результати
export const saveResults = async (req, res) => {
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

    const updated = await act.save();

    res.status(200).json(updated);
  } catch (error) {
    console.error("Помилка при збереженні результатів:", error);
    res.status(500).json({ message: "Не вдалося зберегти результати" });
  }
};

// PUT /api/acts/:id — оновлення акту повністю
export const updateAct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const act = await Act.findByIdAndUpdate(id, updateData, { new: true });

    if (!act) {
      return res.status(404).json({ message: "Акт не знайдено" });
    }

    res.status(200).json(act);
  } catch (error) {
    console.error("Помилка при оновленні акту:", error);
    res.status(500).json({ message: "Помилка сервера" });
  }
};