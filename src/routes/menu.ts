import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { isAdmin } from '../middleware/auth';

const router = Router();

// GET all menu items
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const whereClause = category ? { category: category as string } : {};
    
    const menuItems = await prisma.menuItem.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// GET all unique categories
router.get('/categories', async (req: Request, res: Response) => {
  try {
    const categories = await prisma.menuItem.findMany({
      select: { category: true },
      distinct: ['category'],
    });

    res.json(categories.map((c: { category: string }) => c.category));
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// GET a single menu item
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const menuItem = await prisma.menuItem.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    
    res.json(menuItem);
  } catch (error) {
    console.error('Error fetching menu item:', error);
    res.status(500).json({ error: 'Failed to fetch menu item' });
  }
});

// CREATE a new menu item (Admin only)
router.post('/', isAdmin, async (req: Request, res: Response) => {
  try {
    const { name, content, category, price, image, discount, freeDelivery } = req.body;
    
    if (!name || !category || !price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const menuItem = await prisma.menuItem.create({
      data: {
        name,
        content,
        category,
        price,
        image,
        discount,
        freeDelivery: freeDelivery || false,
      }
    });
    
    res.status(201).json(menuItem);
  } catch (error) {
    console.error('Error creating menu item:', error);
    res.status(500).json({ error: 'Failed to create menu item' });
  }
});

// UPDATE a menu item (Admin only)
router.put('/:id', isAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, content, category, price, image, discount, freeDelivery } = req.body;

    const menuItem = await prisma.menuItem.update({
      where: { id: parseInt(id) },
      data: {
        name,
        content,
        category,
        price,
        image,
        discount,
        freeDelivery,
      }
    });
    
    res.json(menuItem);
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ error: 'Failed to update menu item' });
  }
});

// DELETE a menu item (Admin only)
router.delete('/:id', isAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.menuItem.delete({
      where: { id: parseInt(id) }
    });
    
    res.json({ message: 'Menu item deleted' });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ error: 'Failed to delete menu item' });
  }
});

export default router;

