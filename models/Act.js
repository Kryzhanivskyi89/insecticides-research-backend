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

const ActSchema = new mongoose.Schema({
  actNumber: String,
  year: String,
  actDate: String,
  receivedDate: String,
  transferredBy: String,
  samples: [
    {
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
    },
  ],
  experiment: {
    layingDate: String,
    control: ControlSchema,
    samplesData: [SampleSchema],
  },
  activityData: [ActivitySchema],
  conclusion: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Act = mongoose.model("Act", ActSchema);
export default Act;