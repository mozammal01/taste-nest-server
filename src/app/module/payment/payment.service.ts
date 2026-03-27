import dotenv from 'dotenv';
dotenv.config();

import Stripe from 'stripe';
import AppError from '../../errorHelpers/AppError';

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

export const PaymentService = {
  createPaymentIntent,
};
