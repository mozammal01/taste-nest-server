import prisma from "../../../lib/prisma";

const getStats = async () => {
    const users = await prisma.user.count();
    const menuItems = await prisma.menuItem.count();
    const orders = await prisma.order.count();

    const revenueResult = await prisma.order.aggregate({
        _sum: {
            totalPrice: true
        },
        where: {
            status: 'paid' // Or 'completed' depending on status naming
        }
    });

    const totalRevenue = revenueResult._sum.totalPrice || 0;

    return {
        users,
        menuItems,
        orders,
        totalRevenue
    };
}

export const AdminService = {
    getStats
}
