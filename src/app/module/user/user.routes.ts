import { Router } from "express";
import { UserController } from "./user.controller";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { UserValidations } from "./user.validation";

const router = Router();

router.get("/me", auth(), UserController.getMyProfile);

router.patch(
  "/me",
  auth(),
  validateRequest(UserValidations.updateUserValidationSchema),
  UserController.updateMyProfile
);

router.get("/", auth("admin"), UserController.getAllUsers);

export const UserRoutes = router;
