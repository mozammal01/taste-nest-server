import { Router } from "express";
import { OrderController } from "./order.controller.js";
import auth from "../../middleware/auth.js";
import validateRequest from "../../middleware/validateRequest.js";
import { OrderValidations } from "./order.validation.js";

const router = Router();

router.post(
  "/",
  auth(),
  validateRequest(OrderValidations.createOrderValidationSchema),
  OrderController.createOrder
);
router.get("/my-orders", auth(), OrderController.getMyOrders);
router.get("/", auth("admin"), OrderController.getAllOrders);
router.patch("/:id", auth("admin"), OrderController.updateOrderStatus);

export const OrderRoutes = router;
