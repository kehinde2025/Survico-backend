import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import {
  requestWithdrawal
} from "../controllers/withdrawal.controller.js";

const router = Router();

router.post("/", auth, requestWithdrawal);

router.get("/", auth, async (req, res) => {
  const withdrawals = await Withdrawal.find({ user: req.user.id });
  res.json(withdrawals);
});

export default router;
