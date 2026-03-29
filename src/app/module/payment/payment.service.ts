import dotenv from 'dotenv';
dotenv.config();

import Stripe from 'stripe';
import AppError from '../../errorHelpers/AppError';
import prisma from '../../../lib/prisma';

const getStripeClient = () => {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    throw new AppError(500, "Stripe is not configured. Please set STRIPE_SECRET_KEY.");
  }

  return new Stripe(stripeSecretKey);
};

const createPaymentIntent = async (amount: number) => {
  const stripe = getStripeClient();
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // convert to cents
    currency: 'usd',
    payment_method_types: ['card'],
  });

  return {
    clientSecret: paymentIntent.client_secret,
  };
};

const getMyPayments = async (userId: string) => {
  const result = await prisma.payment.findMany({
    where: {
      order: {
        userId: userId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

export const PaymentService = {
  createPaymentIntent,
  getMyPayments,
};
