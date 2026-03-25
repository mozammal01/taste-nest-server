import { Router } from "express";
import { CartController } from "./cart.controller";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { CartValidations } from "./cart.validation";

const router = Router();

router.post(
  "/",
  auth(),
  validateRequest(CartValidations.addToCartValidationSchema),
  CartController.addToCart
);

router.get("/", auth(), CartController.getMyCart);

router.put(
  "/:id",
  auth(),
  validateRequest(CartValidations.updateCartQuantityValidationSchema),
  CartController.updateCartItemQuantity
);

router.delete("/:id", auth(), CartController.removeCartItem);
router.delete("/", auth(), CartController.clearCart);

export const CartRoutes = router;
