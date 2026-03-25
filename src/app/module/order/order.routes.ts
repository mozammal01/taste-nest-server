import { Router } from "express";
import { OrderController } from "./order.controller";
import { isAdmin, isAuthenticated } from "../../../middleware/auth";

const router = Router();

router.post("/", isAuthenticated, OrderController.createOrder);
router.get("/my-orders", isAuthenticated, OrderController.getMyOrders);
router.get("/", isAdmin, OrderController.getAllOrders);
router.patch("/:id", isAdmin, OrderController.updateOrderStatus);

export const OrderRoutes = router;
