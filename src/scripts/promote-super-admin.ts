import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function promoteToSuperAdmin(email: string) {
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: "super_admin" },
    });
    console.log(`Successfully promoted ${email} to super_admin.`);
    return user;
  } catch (error) {
    console.error(`Failed to promote ${email}:`, error);
  } finally {
    await prisma.$disconnect();
  }
}

const targetEmail = process.argv[2] || "mozammalhaq01@gmail.com";
promoteToSuperAdmin(targetEmail);
