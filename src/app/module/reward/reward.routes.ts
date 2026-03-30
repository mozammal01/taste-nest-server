import { Router } from "express";
import { RewardController } from "./reward.controller.js";
import auth from "../../middleware/auth.js";

const router = Router();

router.get("/my-rewards", auth("user", "admin"), RewardController.getMyRewards);

export const RewardRoutes = router;
