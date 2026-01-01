const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },

  type: { type: String, enum: ["survey", "offer"], required: true },

  reward: { type: Number, default: 0 },
  points: { type: Number, default: 0 },

  provider: { type: String, default: "internal" },
  status: { type: String, enum: ["active", "paused"], default: "active" },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Offer", OfferSchema);
