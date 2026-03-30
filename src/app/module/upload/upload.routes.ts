import { Router } from "express";
import auth from "../../middleware/auth.js";
import { uploadImage } from "../../config/multer.js";
import AppError from "../../errorHelpers/AppError.js";
import catchAsync from "../../utils/catchAsync.js";

const router = Router();

router.post(
  "/image",
  auth("admin"),
  uploadImage.single("image"),
  catchAsync(async (req, res) => {
    const file = (req as any).file as { path?: string } | undefined;

    if (!file?.path) {
      throw new AppError(400, "No image uploaded. Please provide 'image' file.");
    }

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      data: {
        url: file.path,
      },
    });
  })
);

export const UploadRoutes = router;

