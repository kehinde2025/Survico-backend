import mongoose from "mongoose";

export default mongoose.model(
  "CompletedTask",
  new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    provider: String,
    taskId: String
  }, { timestamps: true })
);
