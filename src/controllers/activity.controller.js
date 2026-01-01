const UserActivity = require("../models/UserActivity");
const Offer = require("../models/Offer");
const User = require("../models/User");

// Start an offer/survey
exports.startActivity = async (req, res) => {
  try {
    const { offerId } = req.params;
    const userId = req.user._id;

    const offer = await Offer.findById(offerId);
    if (!offer || offer.status !== "active") {
      return res.status(400).json({ message: "Offer not available" });
    }

    // Check if user already started
    const existing = await UserActivity.findOne({ userId, offerId });
    if (existing) {
      return res.status(400).json({ message: "Already started" });
    }

    const activity = new UserActivity({
      userId,
      offerId,
      type: offer.type,
      reward: offer.reward,
      points: offer.points
    });

    await activity.save();
    res.status(201).json({ message: "Activity started", activity });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error starting activity" });
  }
};

// Complete an offer/survey
exports.completeActivity = async (req, res) => {
  try {
    const { offerId } = req.params;
    const userId = req.user._id;

    const activity = await UserActivity.findOne({ userId, offerId });
    if (!activity || activity.status === "completed") {
      return res.status(400).json({ message: "Activity not found or already completed" });
    }

    activity.status = "completed";
    activity.completedAt = new Date();
    await activity.save();

    // Credit user balance & points
    const user = await User.findById(userId);
    user.balance += activity.reward;
    user.points += activity.points;
    user.totalCompleted += 1;
    user.totalEarned += activity.reward;
    await user.save();

    res.json({ message: "Activity completed", activity, balance: user.balance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error completing activity" });
  }
};

// Get user history (Earn Hub)
exports.getActivityHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    const activities = await UserActivity.find({ userId }).populate("offerId", "title type");

    const in_progress = activities.filter(a => a.status === "in_progress");
    const pending = activities.filter(a => a.status === "pending");
    const completed = activities.filter(a => a.status === "completed");

    res.json({ in_progress, pending, completed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching history" });
  }
};
