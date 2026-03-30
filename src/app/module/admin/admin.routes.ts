import { Router } from "express";
import { AdminController } from "./admin.controller.js";
import auth from "../../middleware/auth.js";

const router = Router();

router.get(
    "/stats",
    auth("admin"),
    AdminController.getStats
);

export const AdminRoutes = router;
