import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
    console.warn('⚠️  Stripe secret key not found. Payment features will be disabled.');
}

export const stripe = stripeSecretKey
    ? new Stripe(stripeSecretKey, {
        apiVersion: '2023-10-16',
    })
    : null;

export default stripe;
