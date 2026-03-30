import { Router } from "express";
import { UserController } from "./user.controller";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { UserValidations } from "./user.validation";
import { uploadImage } from "../../config/multer";

const router = Router();

router.get("/me", auth(), UserController.getMyProfile);

router.patch(
  "/me",
  auth(),
  uploadImage.single("image"),
  (req, res, next) => {
    // Merge data from the "data" field if it exists (for nested JSON in multipart)
    if (req.body.data) {
      try {
        const parsedData = JSON.parse(req.body.data);
        Object.assign(req.body, parsedData);
        delete req.body.data;
      } catch (err) {
        // Ignore JSON parse errors here, validation middleware will catch missing fields
      }
    }
    next();
  },
  validateRequest(UserValidations.updateUserValidationSchema),
  UserController.updateMyProfile
);

router.get("/", auth("admin"), UserController.getAllUsers);

router.patch("/:id", auth("admin"), UserController.updateUser);

router.delete("/:id", auth("admin"), UserController.deleteUser);

export const UserRoutes = router;
