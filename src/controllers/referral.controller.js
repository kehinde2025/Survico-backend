import User from "../models/User.js";
export const referrals = async (req, res) =>
  res.json({ total: await User.countDocuments({ referredBy: req.user.id }) });
