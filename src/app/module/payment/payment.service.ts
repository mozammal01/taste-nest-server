import Stripe from 'stripe';
import dotenv from 'dotenv';
import AppError from '../../errorHelpers/AppError';
dotenv.config();

const getStripeClient = () => {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    throw new AppError(500, "Stripe is not configured. Please set STRIPE_SECRET_KEY.");
  }

  return new Stripe(stripeSecretKey, {
    apiVersion: '2025-02-24-preview' as any,
  });
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

export const PaymentService = {
  createPaymentIntent,
};
