import { Router } from "express";
import { MenuController } from "./menu.controller";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { MenuValidations } from "./menu.validation";

const router = Router();

router.post(
  "/",
  auth("admin"),
  validateRequest(MenuValidations.createMenuItemValidationSchema),
  MenuController.createMenuItem
);
router.get("/", MenuController.getAllMenuItems);
router.get("/categories", MenuController.getCategories);
router.get("/:id", MenuController.getSingleMenuItem);
router.put(
  "/:id",
  auth("admin"),
  validateRequest(MenuValidations.updateMenuItemValidationSchema),
  MenuController.updateMenuItem
);
router.delete("/:id", auth("admin"), MenuController.deleteMenuItem);

export const MenuRoutes = router;
