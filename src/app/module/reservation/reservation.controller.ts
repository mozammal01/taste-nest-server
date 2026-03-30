import { Request, Response } from "express";
import { ReservationService } from "./reservation.service.js";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";

const createReservation = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const result = await ReservationService.createReservation(user.id, req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Reservation created successfully",
        data: result
    });
});

const getMyReservations = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const result = await ReservationService.getMyReservations(user.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Reservations fetched successfully",
        data: result
    });
});

const cancelReservation = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const { id } = req.params;
    const result = await ReservationService.cancelReservation(Number(id), user.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Reservation cancelled successfully",
        data: result
    });
});

export const ReservationController = {
    createReservation,
    getMyReservations,
    cancelReservation
}
