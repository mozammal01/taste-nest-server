import { Router } from "express";
import { RewardController } from "./reward.controller";
import auth from "../../middleware/auth";

const router = Router();

router.get("/my-rewards", auth("user", "admin"), RewardController.getMyRewards);

export const RewardRoutes = router;
