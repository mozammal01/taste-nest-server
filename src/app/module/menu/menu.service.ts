import prisma from "../../../lib/prisma";

const createMenuItem = async (payload: any) => {
    const result = await prisma.menuItem.create({
        data: payload
    });
    return result;
}

const getAllMenuItems = async (query: Record<string, any>) => {
    const { category } = query;
    const whereClause = category ? { category: category as string } : {};
    
    const result = await prisma.menuItem.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' }
    });
    return result;
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
