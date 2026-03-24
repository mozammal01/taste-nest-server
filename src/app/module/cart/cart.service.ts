import prisma from "../../../lib/prisma";

const addToCart = async (userId: string, payload: { menuItemId: number, quantity?: number }) => {
    const { menuItemId, quantity = 1 } = payload;
    
    // Check if item already in cart
    const existingItem = await prisma.cart.findFirst({
      where: { userId, menuItemId }
    });

    if (existingItem) {
      return await prisma.cart.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      });
    }

    return await prisma.cart.create({
      data: {
        userId,
        menuItemId,
        quantity
      }
    });
}

const getMyCart = async (userId: string) => {
    const cartItems = await prisma.cart.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
    
    // Fetch menu item details
    const menuItemIds = cartItems.map((item: any) => item.menuItemId);
    const menuItems = await prisma.menuItem.findMany({
      where: { id: { in: menuItemIds } },
    });

    const menuItemMap = new Map(menuItems.map((item: any) => [item.id, item]));

    return cartItems.map((item: any) => ({
      ...item,
      menuItem: menuItemMap.get(item.menuItemId)
    }));
}

const updateCartItemQuantity = async (userId: string, id: number, quantity: number) => {
    return await prisma.cart.update({
      where: { id, userId },
      data: { quantity }
    });
}

const removeCartItem = async (userId: string, id: number) => {
    return await prisma.cart.delete({
      where: { id, userId }
    });
}

const clearCart = async (userId: string) => {
    return await prisma.cart.deleteMany({
      where: { userId }
    });
}

export const CartService = {
    addToCart,
    getMyCart,
    updateCartItemQuantity,
    removeCartItem,
    clearCart
}
