import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  console.log("[prisma]: Creating new PrismaClient instance...");
  try {
    return new PrismaClient({
        log: ['error', 'warn'],
    });
  } catch (error) {
    console.error("[prisma]: Failed to initialize PrismaClient:", error);
    throw error;
  }
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
