import User from "../models/User.js";
import Wallet from "../models/wallet.js";
import Offer from "../models/Offer.js";
import Survey from "../models/survey.js"; 

export const dashboard = async (req, res) => {
  const wallet = await Wallet.findOne({ user: req.user.id });
  res.json({
    earnings: wallet.balance,
    points: wallet.points,
    tasksCompleted: wallet.tasksCompleted,
    referrals: await User.countDocuments({ referredBy: req.user.id }),
    topOffers: await Offer.find().limit(5),
    topSurveys: await Survey.find().limit(5)
  });
};
