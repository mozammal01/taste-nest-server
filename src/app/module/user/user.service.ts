import prisma from "../../../lib/prisma";

const getMyProfile = async (id: string) => {
    const result = await prisma.user.findUnique({
        where: { id }
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
    getAllUsers
}
