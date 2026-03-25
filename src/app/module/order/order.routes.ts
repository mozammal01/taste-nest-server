import { Router } from "express";
import { OrderController } from "./order.controller";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { OrderValidations } from "./order.validation";

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
