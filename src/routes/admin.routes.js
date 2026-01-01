import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import admin from "../middlewares/admin.middleware.js";
import User from "../models/User.js";
import Withdrawal from "../models/Withdrawal.js";

const router = Router();

router.use(auth, admin);

router.get("/users", async (_, res) => {
  res.json(await User.find());
});

router.get("/withdrawals", async (_, res) => {
  res.json(await Withdrawal.find({ status: "pending" }));
});

router.put("/withdrawals/:id/approve", async (req, res) => {
  const w = await Withdrawal.findById(req.params.id);
  w.status = "approved";
  await w.save();
  res.json(w);
});

export default router;
