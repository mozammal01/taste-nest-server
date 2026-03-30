import prisma from "../../../lib/prisma.js";
import AppError from "../../errorHelpers/AppError.js";

const getMyProfile = async (id: string) => {
    const result = await prisma.user.findUnique({
        where: { id },
        include: {
            _count: {
                select: {
                    orders: true,
                    reservations: true,
                    favorites: true,
                    rewards: true
                }
            },
            rewards: true
        }
    });
    return result;
}

const updateMyProfile = async (id: string, payload: any) => {
    const result = await prisma.user.update({
        where: { id },
        data: payload
    });
    return result;
}

const updateUser = async (currentUserId: string, targetUserId: string, payload: any) => {
    if (payload.role) {
        const targetUser = await prisma.user.findUnique({
            where: { id: targetUserId },
            select: { role: true }
        });

        if (!targetUser) {
            throw new AppError(404, "Target user not found");
        }

        if (targetUser.role === 'admin' && currentUserId !== targetUserId) {
            throw new AppError(403, "You cannot change the role of another admin.");
        }
    }

    const result = await prisma.user.update({
        where: { id: targetUserId },
        data: payload
    });
    return result;
}

const deleteUser = async (id: string, force: boolean = false) => {
    const userWithOrders = await prisma.user.findUnique({
        where: { id },
        include: {
            orders: true
        }
    });

    if (!userWithOrders) {
        throw new AppError(404, "User not found");
    }

    if (userWithOrders.orders.length > 0 && !force) {
        throw new AppError(400, "USER_HAS_ORDERS");
    }

    const result = await prisma.$transaction(async (tx) => {
        const orderIds = userWithOrders.orders.map(o => o.id);

        if (orderIds.length > 0) {
            await tx.payment.deleteMany({ where: { orderId: { in: orderIds } } });
            await tx.orderItem.deleteMany({ where: { orderId: { in: orderIds } } });
        }

        await tx.order.deleteMany({ where: { userId: id } });
        await tx.reservation.deleteMany({ where: { userId: id } });
        await tx.favorite.deleteMany({ where: { userId: id } });
        await tx.reward.deleteMany({ where: { userId: id } });
        await tx.cart.deleteMany({ where: { userId: id } });

        return await tx.user.delete({
            where: { id }
        });
    });

    return result;
}

const getAllUsers = async (filters: any, options: any) => {
    const { searchTerm, role } = filters;
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const andConditions: any[] = [];

    if (searchTerm) {
        andConditions.push({
            OR: ['name', 'email'].map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }

    if (role) {
        andConditions.push({
            role: { equals: role }
        });
    }

    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.user.findMany({
        where: whereConditions,
        skip,
        take,
        orderBy: {
            [sortBy as string]: sortOrder
        }
    });

    const total = await prisma.user.count({
        where: whereConditions
    });

    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            total
        },
        data: result
    };
}

export const UserService = {
    getMyProfile,
    updateMyProfile,
    getAllUsers,
    updateUser,
    deleteUser
}
