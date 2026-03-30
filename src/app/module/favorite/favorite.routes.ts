import { Router } from "express";
import { FavoriteController } from "./favorite.controller.js";
import auth from "../../middleware/auth.js";

const router = Router();

router.post("/toggle", auth("user", "admin"), FavoriteController.toggleFavorite);
router.get("/my-favorites", auth("user", "admin"), FavoriteController.getMyFavorites);

export const FavoriteRoutes = router;
