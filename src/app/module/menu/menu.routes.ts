import { Router } from "express";
import { MenuController } from "./menu.controller";
import { isAdmin } from "../../../middleware/auth";

const router = Router();

router.post("/", isAdmin, MenuController.createMenuItem);
router.get("/", MenuController.getAllMenuItems);
router.get("/categories", MenuController.getCategories);
router.get("/:id", MenuController.getSingleMenuItem);
router.put("/:id", isAdmin, MenuController.updateMenuItem);
router.delete("/:id", isAdmin, MenuController.deleteMenuItem);

export const MenuRoutes = router;
