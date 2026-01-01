import { Router } from "express";
import verifySignature from "../middlewares/verifySignature.js";
import { reward } from "../controllers/callback.controller.js";

const router = Router();

router.post("/provider", verifySignature, reward);

export default router;
