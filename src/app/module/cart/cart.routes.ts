import { Router } from "express";
import { CartController } from "./cart.controller";
import { isAuthenticated } from "../../../middleware/auth";

const router = Router();

router.post("/", isAuthenticated, CartController.addToCart);
router.get("/", isAuthenticated, CartController.getMyCart);
router.put("/:id", isAuthenticated, CartController.updateCartItemQuantity);
router.delete("/:id", isAuthenticated, CartController.removeCartItem);
router.delete("/", isAuthenticated, CartController.clearCart);

export const CartRoutes = router;
