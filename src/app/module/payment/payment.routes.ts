import { Router } from "express";
import { PaymentController } from "./payment.controller.js";
import auth from "../../middleware/auth.js";

const router = Router();

router.post(
    "/create-payment-intent",
    auth(),
    PaymentController.createPaymentIntent
);

router.get("/my-payments", auth("user", "admin"), PaymentController.getMyPayments);
router.get("/", auth("admin"), PaymentController.getAllPayments);

export const PaymentRoutes = router;
