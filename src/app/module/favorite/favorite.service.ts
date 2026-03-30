import prisma from "../../../lib/prisma.js";

const toggleFavorite = async (userId: string, menuItemId: number) => {
    const existing = await prisma.favorite.findUnique({
        where: {
            userId_menuItemId: {
                userId,
                menuItemId
            }
        }
    });

    if (existing) {
        return await prisma.favorite.delete({
            where: { id: existing.id }
        });
    } else {
        return await prisma.favorite.create({
            data: {
                userId,
                menuItemId
            }
        });
    }
}

const getMyFavorites = async (userId: string) => {
    const result = await prisma.favorite.findMany({
        where: { userId },
        include: {
            menuItem: true
        },
        orderBy: { createdAt: 'desc' }
    });
    return result;
}

export const FavoriteService = {
    toggleFavorite,
    getMyFavorites
}
