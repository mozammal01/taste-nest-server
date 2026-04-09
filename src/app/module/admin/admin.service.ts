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

        // Get revenue trend (last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const recentPayments = await prisma.payment.findMany({
            where: {
                createdAt: {
                    gte: sixMonthsAgo
                },
                status: {
                    in: ["completed", "succeeded"]
                }
            },
            select: {
                amount: true,
                createdAt: true
            }
        });

        // Format revenue trend data
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const trendMap: Record<string, number> = {};
        
        recentPayments.forEach(p => {
            const date = new Date(p.createdAt);
            const key = `${months[date.getMonth()]} ${date.getFullYear()}`;
            trendMap[key] = (trendMap[key] || 0) + Number(p.amount);
        });

        const revenueTrend = Object.entries(trendMap).map(([name, total]) => ({ name, total }));

        // Get order status distribution
        const orderGroups = await prisma.order.groupBy({
            by: ['status'],
            _count: {
                _all: true
            }
        });

        const orderDistribution = orderGroups.map(g => ({
            name: g.status,
            value: g._count._all
        }));

        const totalRevenue = Number(paymentResult._sum.amount || 0);

        return {
            users: Number(totalUsers || 0),
            menuItems: Number(totalMenuItems || 0),
            orders: Number(totalOrders || 0),
            totalRevenue: Number(totalRevenue || 0),
            revenueTrend,
            orderDistribution
        };
    } catch (error) {
        return {
            users: 0,
            menuItems: 0,
            orders: 0,
            totalRevenue: 0,
            revenueTrend: [],
            orderDistribution: []
        };
    }
}

export const AdminService = {
    getStats
}
