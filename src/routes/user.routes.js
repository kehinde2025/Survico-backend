import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import { dashboard } from "../controllers/user.controller.js";

const router = Router();

router.get("/dashboard", auth, dashboard);

export default router;
