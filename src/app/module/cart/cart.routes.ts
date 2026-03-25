import { Router } from "express";
import { CartController } from "./cart.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", auth(), CartController.addToCart);
router.get("/", auth(), CartController.getMyCart);
router.put("/:id", auth(), CartController.updateCartItemQuantity);
router.delete("/:id", auth(), CartController.removeCartItem);
router.delete("/", auth(), CartController.clearCart);

export const CartRoutes = router;
