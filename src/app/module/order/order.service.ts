import prisma from "../../../lib/prisma.js";

const createOrder = async (userId: string, payload: { items: any[], address: string, phone: string, totalAmount: number, transactionId?: string, paymentStatus?: string }) => {
    // 1. Start Transaction
    return await prisma.$transaction(async (tx) => {
        // 2. Create the Order
        const order = await tx.order.create({
            data: {
                userId,
                totalAmount: payload.totalAmount,
                address: payload.address,
                phone: payload.phone,
                transactionId: payload.transactionId,
                paymentStatus: payload.paymentStatus || 'unpaid',
                items: {
                    create: payload.items.map(item => ({
                        menuItemId: item.menuItemId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            },
            include: {
                items: true
            }
        });

        // 3. Create a Payment record if it's already paid (e.g. via Stripe)
        if (payload.transactionId) {
            await tx.payment.create({
                data: {
                    orderId: order.id,
                    amount: payload.totalAmount,
                    status: 'succeeded',
                    transactionId: payload.transactionId,
                    paymentMethod: 'card'
                }
            });
        }

        // 4. Clear the user's cart after placing the order
        await tx.cart.deleteMany({
            where: { userId }
        });

        return order;
    });
}

const getMyOrders = async (userId: string) => {
    const result = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            menuItem: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return result;
}

const getAllOrders = async () => {
    const result = await prisma.order.findMany({
        include: {
            user: true,
            items: {
                include: {
                    menuItem: true
                }
            }
        },
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
