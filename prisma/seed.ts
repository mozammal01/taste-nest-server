import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const menuItems = [
    {
      name: 'Spicy Chicken Ramen',
      content: 'Rich and spicy broth with tender chicken slices and hand-pulled noodles.',
      category: 'Japanese',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624',
      freeDelivery: true,
    },
    {
        name: 'Classic Margherita Pizza',
        content: 'Fresh mozzarella, tomato sauce, and basil on a thin crispy crust.',
        category: 'Italian',
        price: 14.50,
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3',
        freeDelivery: false,
    },
    {
        name: 'Avocado Toast with Egg',
        content: 'Sourdough bread topped with creamy avocado, poached egg, and red pepper flakes.',
        category: 'Breakfast',
        price: 9.75,
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8',
        freeDelivery: true,
    },
    {
        name: 'Grilled Salmon with Asparagus',
        content: 'Premium Atlantic salmon grilled to perfection with lemon butter sauce.',
        category: 'Seafood',
        price: 22.00,
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288',
        freeDelivery: false,
    }
  ];

  // Clean existing menu items first for fresh seeding if needed
  // await prisma.menuItem.deleteMany();

  for (const item of menuItems) {
    await prisma.menuItem.upsert({
      where: { id: 0 }, // Using id: 0 as a placeholder for upsert to ensure names are unique if you use them as index,
      // but MenuItem doesn't have unique name. So we use create.
      create: item,
      update: item,
    });
  }

  // Creating a default admin user placeholder (Better Auth handles real users, but for stats we need some)
  /*
  await prisma.user.upsert({
      where: { email: 'admin@tastenest.com' },
      update: {},
      create: {
          id: 'admin_123',
          name: 'Super Admin',
          email: 'admin@tastenest.com',
          emailVerified: true,
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
      }
  });
  */

  console.log('Seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
