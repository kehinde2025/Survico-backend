import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Wallet from "../models/wallet.js";

export const register = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    email: req.body.email,
    password: hash,
    referralCode: Math.random().toString(36).slice(2,8),
    referredBy: req.body.referral
  });
  await Wallet.create({ user: user._id });
  res.json(user);
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !await bcrypt.compare(req.body.password, user.password))
    return res.sendStatus(401);

  res.json({
    token: jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET)
  });
};
