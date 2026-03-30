import prisma from "../../../lib/prisma.js";

const createReservation = async (userId: string, payload: any) => {
    const result = await prisma.reservation.create({
        data: {
            ...payload,
            userId
        }
    });
    return result;
}

const getMyReservations = async (userId: string) => {
    const result = await prisma.reservation.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
    });
    return result;
}

const getAllReservations = async () => {
    const result = await prisma.reservation.findMany({
        include: { user: true },
        orderBy: { createdAt: 'desc' }
    });
    return result;
}

const updateReservationStatus = async (id: number, status: string) => {
    const result = await prisma.reservation.update({
        where: { id },
        data: { status }
    });
    return result;
}

const cancelReservation = async (id: number, userId: string) => {
    // Verify ownership
    const reservation = await prisma.reservation.findUnique({
        where: { id }
    });

    if (!reservation) {
        throw new Error("Reservation not found");
    }

    if (reservation.userId !== userId) {
        throw new Error("Unauthorized to cancel this reservation");
    }

    const result = await prisma.reservation.update({
        where: { id },
        data: { status: "cancelled" }
    });
    return result;
}

export const ReservationService = {
    createReservation,
    getMyReservations,
    getAllReservations,
    updateReservationStatus,
    cancelReservation
}
