import prisma from './src/lib/prisma';

async function seedMissingPayments() {
  const paidOrdersWithoutPaymentRecord = await prisma.order.findMany({
    where: {
      transactionId: { not: null },
      payment: null,
    },
  });

  console.log(`Found ${paidOrdersWithoutPaymentRecord.length} paid orders without a Payment record.`);

  for (const order of paidOrdersWithoutPaymentRecord) {
    await prisma.payment.create({
      data: {
        orderId: order.id,
        amount: order.totalAmount,
        status: 'succeeded',
        transactionId: order.transactionId,
        paymentMethod: 'card',
        createdAt: order.createdAt,
      },
    });
    console.log(`Created Payment record for Order #${order.id}`);
  }

  console.log('Migration completed.');
}

seedMissingPayments()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
