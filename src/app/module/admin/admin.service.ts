import prisma from "../../../lib/prisma.js";

const getStats = async () => {
    try {
        const totalUsers = await prisma.user.count();
        const totalMenuItems = await prisma.menuItem.count();
        const totalOrders = await prisma.order.count();
        
        const paymentResult = await prisma.payment.aggregate({
            _sum: {
                amount: true
            }
        });

        const orderRevenueResult = await prisma.order.aggregate({
            _sum: {
                totalAmount: true
            }
        });

        const rawRevenue = Number(paymentResult._sum.amount || 0) || Number(orderRevenueResult._sum.totalAmount || 0);

        return {
            users: Number(totalUsers || 0),
            menuItems: Number(totalMenuItems || 0),
            orders: Number(totalOrders || 0),
            totalRevenue: Number(rawRevenue || 0)
        };
    } catch (error) {
        return {
            users: 0,
            menuItems: 0,
            orders: 0,
            totalRevenue: 0
        };
    }
}

export const AdminService = {
    getStats
}
