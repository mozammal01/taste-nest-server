import prisma from "../../../lib/prisma";

const createMenuItem = async (payload: any) => {
    const result = await prisma.menuItem.create({
        data: payload
    });
    return result;
}

const getAllMenuItems = async (filters: any, options: any) => {
    const { searchTerm, ...filterData } = filters;
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: ['name', 'category'].map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        });
    }

    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.menuItem.findMany({
        where: whereConditions,
        skip,
        take,
        orderBy: {
            [sortBy as string]: sortOrder
        }
    });

    const total = await prisma.menuItem.count({
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

const getCategories = async () => {
    const result = await prisma.menuItem.findMany({
        select: { category: true },
        distinct: ['category'],
    });
    return result.map((c: { category: string }) => c.category);
}

const getSingleMenuItem = async (id: number) => {
    const result = await prisma.menuItem.findUnique({
        where: { id }
    });
    return result;
}

const updateMenuItem = async (id: number, payload: any) => {
    const result = await prisma.menuItem.update({
        where: { id },
        data: payload
    });
    return result;
}

const deleteMenuItem = async (id: number) => {
    const result = await prisma.menuItem.delete({
        where: { id }
    });
    return result;
}

export const MenuService = {
    createMenuItem,
    getAllMenuItems,
    getCategories,
    getSingleMenuItem,
    updateMenuItem,
    deleteMenuItem
}
