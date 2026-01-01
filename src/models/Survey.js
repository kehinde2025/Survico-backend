const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  reward: { type: Number, required: true },
  status: { type: String, default: "active" }, // active, closed
  targetCountry: String,
  targetDevice: String,
  expiryDate: Date,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Survey", surveySchema);
