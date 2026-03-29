import { Router } from "express";
import { PaymentController } from "./payment.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post(
    "/create-payment-intent",
    auth(),
    PaymentController.createPaymentIntent
);

router.get("/my-payments", auth("user", "admin"), PaymentController.getMyPayments);

export const PaymentRoutes = router;
