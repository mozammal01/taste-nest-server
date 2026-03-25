import { Router } from "express";
import { MenuController } from "./menu.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", auth("admin"), MenuController.createMenuItem);
router.get("/", MenuController.getAllMenuItems);
router.get("/categories", MenuController.getCategories);
router.get("/:id", MenuController.getSingleMenuItem);
router.put("/:id", auth("admin"), MenuController.updateMenuItem);
router.delete("/:id", auth("admin"), MenuController.deleteMenuItem);

export const MenuRoutes = router;
