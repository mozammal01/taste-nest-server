import prisma from "../../../lib/prisma";

const createOrder = async (userId: string, payload: any) => {
    // Basic order creation
    // In a real app, we might calculate total price here or fetch from cart
    const result = await prisma.order.create({
        data: {
            userId,
            menuItemId: payload.menuItemId,
            quantity: payload.quantity,
            totalPrice: payload.totalPrice,
            status: 'pending'
        }
    });

    // Optionally clear cart after order if implemented from cart
    return result;
}

const getMyOrders = async (userId: string) => {
    const result = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
    return result;
}

const getAllOrders = async () => {
    const result = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' }
    });
    return result;
}

const updateOrderStatus = async (id: number, status: string) => {
    const result = await prisma.order.update({
        where: { id },
        data: { status }
    });
    return result;
}

export const OrderService = {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
}
