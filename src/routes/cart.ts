import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { isAuthenticated } from '../middleware/auth';

const router = Router();

// GET current user's cart items
router.get('/', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).session.user.id;
    const cartItems = await prisma.cart.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
    
    // Fetch menu item details for each cart item
    const menuItemIds = cartItems.map((item: any) => item.menuItemId);
    const menuItems = await prisma.menuItem.findMany({
      where: { id: { in: menuItemIds } },
    });

    const menuItemMap = new Map(menuItems.map((item: any) => [item.id, item]));

    const cartWithDetails = cartItems.map((item: any) => ({
      ...item,
      menuItem: menuItemMap.get(item.menuItemId)
    }));

    res.json(cartWithDetails);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
});

// ADD item to cart
router.post('/', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).session.user.id;
    const { menuItemId, quantity = 1 } = req.body;

    if (!menuItemId) {
      return res.status(400).json({ error: 'Menu item ID is required' });
    }

    // Check if item already in cart
    const existingItem = await prisma.cart.findFirst({
      where: { userId, menuItemId: parseInt(menuItemId) }
    });

    if (existingItem) {
      const updatedItem = await prisma.cart.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      });
      return res.json(updatedItem);
    }

    const cartItem = await prisma.cart.create({
      data: {
        userId,
        menuItemId: parseInt(menuItemId),
        quantity
      }
    });
    
    res.status(201).json(cartItem);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// UPDATE quantity
router.put('/:id', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).session.user.id;
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1' });
    }

    const cartItem = await prisma.cart.update({
      where: { id: parseInt(id), userId }, // Ensure user owns the cart item
      data: { quantity }
    });
    
    res.json(cartItem);
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

// DELETE item from cart
router.delete('/:id', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).session.user.id;
    const { id } = req.params;

    await prisma.cart.delete({
      where: { id: parseInt(id), userId }
    });
    
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error deleting from cart:', error);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});

// CLEAR cart
router.delete('/', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).session.user.id;

    await prisma.cart.deleteMany({
      where: { userId }
    });
    
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Failed to clear cart' });
  }
});

export default router;
