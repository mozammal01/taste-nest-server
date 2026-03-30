import prisma from "../../../lib/prisma.js";

const getStats = async () => {
    try {
        // Direct database probe
        const totalUsers = await prisma.user.count();
        const totalMenuItems = await prisma.menuItem.count();
        const totalOrders = await prisma.order.count();
        
        // Sum revenue from both sources for maximum accuracy
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

        // Debugging prints in the server terminal - Check these numbers!
        console.log("--- ADMIN STATS DEBUG ---");
        console.log(`[stats] Users Found: ${totalUsers}`);
        console.log(`[stats] Orders Found: ${totalOrders}`);
        console.log(`[stats] Revenue: ${rawRevenue}`);
        console.log("--------------------------");

        return {
            users: Number(totalUsers || 0),
            menuItems: Number(totalMenuItems || 0),
            orders: Number(totalOrders || 0),
            totalRevenue: Number(rawRevenue || 0)
        };
    } catch (error) {
        console.error("[admin-stats] Database Error:", error);
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
