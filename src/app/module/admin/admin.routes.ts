import { Router } from "express";
import { AdminController } from "./admin.controller";
import auth from "../../middleware/auth";

const router = Router();

router.get(
    "/stats",
    auth("admin"),
    AdminController.getStats
);

export const AdminRoutes = router;
