import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const menuItems = [
    {
      name: "Chocolate Lava Cake",
      content: "Warm chocolate cake with a rich molten center.",
      category: "dessert",
      price: 6.99,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
      discount: "15% OFF"
    },
    {
      name: "Classic Cheesecake",
      content: "Creamy cheesecake with a buttery biscuit base.",
      category: "dessert",
      price: 7.49,
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b"
    },
    {
      name: "Vanilla Ice Cream",
      content: "Smooth vanilla ice cream made from fresh cream.",
      category: "dessert",
      price: 4.99,
      image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f",
      freeDelivery: true
    },
    {
      name: "Brownie with Ice Cream",
      content: "Chocolate brownie served with vanilla ice cream.",
      category: "dessert",
      price: 5.99,
      image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e"
    },
    {
      name: "Grilled Ribeye Steak",
      content: "Juicy ribeye steak grilled to perfection.",
      category: "steak",
      price: 22.99,
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
      discount: "15% OFF",
      freeDelivery: true
    },
    {
      name: "Sirloin Steak",
      content: "Tender sirloin steak served with garlic butter.",
      category: "steak",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
    },
    {
      name: "T-Bone Steak",
      content: "Classic T-bone steak with smoky flavor.",
      category: "steak",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947",
      freeDelivery: true
    },
    {
      name: "Pepper Steak",
      content: "Steak cooked with black pepper sauce.",
      category: "steak",
      price: 21.49,
      image: "https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9"
    },
    {
      name: "Espresso",
      content: "Strong and rich espresso made from premium beans.",
      category: "coffee",
      price: 2.99,
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348"
    },
    {
      name: "Cappuccino",
      content: "Hot cappuccino with steamed milk foam.",
      category: "coffee",
      price: 3.99,
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
      discount: "15% OFF"
    },
    {
      name: "Latte",
      content: "Smooth latte with creamy milk and coffee.",
      category: "coffee",
      price: 4.49,
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93"
    },
    {
      name: "Iced Coffee",
      content: "Cold brewed coffee served with ice.",
      category: "coffee",
      price: 3.49,
      image: "https://images.unsplash.com/photo-1517705008128-361805f42e86",
      freeDelivery: true
    },
    {
      name: "Classic Beef Burger",
      content: "Grilled beef patty with lettuce and cheese.",
      category: "burger",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      discount: "15% OFF"
    },
    {
      name: "Chicken Cheese Burger",
      content: "Crispy chicken with melted cheese.",
      category: "burger",
      price: 7.99,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
    },
    {
      name: "Double Beef Burger",
      content: "Two beef patties with extra cheese.",
      category: "burger",
      price: 10.99,
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add",
      freeDelivery: true
    },
    {
      name: "Spicy Chicken Burger",
      content: "Spicy chicken fillet with special sauce.",
      category: "burger",
      price: 8.49,
      image: "https://images.unsplash.com/photo-1618219878829-8afd92751bed"
    },
    {
      name: "Caramel Pudding",
      content: "Soft caramel pudding with sweet syrup.",
      category: "dessert",
      price: 5.49,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
      discount: "15% OFF"
    },
    {
      name: "Mocha Coffee",
      content: "Coffee blended with chocolate flavor.",
      category: "coffee",
      price: 4.99,
      image: "https://images.unsplash.com/photo-1507133750040-4a8f57021571"
    },
    {
      name: "BBQ Beef Burger",
      content: "Beef burger with BBQ sauce and onions.",
      category: "burger",
      price: 9.49,
      image: "https://images.unsplash.com/photo-1550317138-10000687a72b",
      freeDelivery: true
    },
    {
      name: "Garlic Butter Steak",
      content: "Grilled steak topped with garlic butter.",
      category: "steak",
      price: 23.49,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d"
    }
  ];

  console.log('Seeding menu items...');

  // Clean existing menu items first for fresh seeding
  await prisma.menuItem.deleteMany();

  // Create many works much better than looping and trying to upsert without a unique field.
  const result = await prisma.menuItem.createMany({
    data: menuItems,
  });

  console.log(`Successfully seeded ${result.count} menu items.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
