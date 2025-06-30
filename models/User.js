// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "worker", "viewer"],
    default: "viewer",
  },
}, { timestamps: true });

export default mongoose.model("User", userSchema);