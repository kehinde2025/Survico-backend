import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import { getSurveys } from "../controllers/survey.controller.js";

const router = Router();

router.get("/", auth, getSurveys);

export default router;
