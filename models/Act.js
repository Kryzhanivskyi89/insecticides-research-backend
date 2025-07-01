import mongoose from "mongoose";

const RepetitionSchema = new mongoose.Schema({
  before: Number,
  days: [
    {
      day: String,
      value: Number,
    },
  ],
});

const SampleSchema = new mongoose.Schema({
  sampleId: String,
  name: String,
  base: String,
  form: String,
  state: String,
  concentration: String,
  repetitions: [RepetitionSchema],
});

const ControlSchema = new mongoose.Schema({
  before: [Number],
  days: [
    {
      day: String,
      values: [Number],
    },
  ],
});

const ActivitySchema = new mongoose.Schema({
  sampleId: String,
  name: String,
  form: String,
  concentration: String,
  activities: [
    {
      day: String,
      activity: Number,
    },
  ],
});

const SampleInfoSchema = new mongoose.Schema({
  name: String,
  subtype: String,
  base: String,
  date: String,
  quantity: String,
  unit: String,
  form: String,
  state: String,
  concentration: String,
  ph: Number,
  titerInitial: String,
  titerStorage: String,
});

const ActSchema = new mongoose.Schema({
  actNumber: { type: String, default: "" },
  year: { type: String, default: "" },
  actDate: { type: String, default: "" },
  receivedDate: { type: String, default: "" },
  transferredBy: { type: String, default: "" },
  executor: { type: String, default: "" }, // Виконавець (з фронту)
  samples: { type: [SampleInfoSchema], default: [] },
  experiment: {
    layingDate: { type: String, default: "" },
    control: { type: ControlSchema, default: () => ({}) },
    samplesData: { type: [SampleSchema], default: [] },
  },
  activityData: {
    type: [ActivitySchema],
    default: []
  },
  conclusion: {
    type: String,
    default: ""
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
}, { timestamps: true });

const Act = mongoose.model("Act", ActSchema);
export default Act;