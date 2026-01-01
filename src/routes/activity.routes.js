import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import Activity from "../models/Activity.js";

const router = Router();

router.get("/", auth, async (req, res) => {
  const activities = await Activity.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(activities);
});

export default router;
