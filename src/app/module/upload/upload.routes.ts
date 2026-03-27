import { Router } from "express";
import auth from "../../middleware/auth";
import { uploadImage } from "../../config/multer";
import AppError from "../../errorHelpers/AppError";
import catchAsync from "../../utils/catchAsync";

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

