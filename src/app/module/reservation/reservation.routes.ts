import { Router } from "express";
import { ReservationController } from "./reservation.controller.js";
import auth from "../../middleware/auth.js";

const router = Router();

router.post("/", auth("user", "admin"), ReservationController.createReservation);
router.get("/my-reservations", auth("user", "admin"), ReservationController.getMyReservations);
router.delete("/:id", auth("user", "admin"), ReservationController.cancelReservation);

export const ReservationRoutes = router;
