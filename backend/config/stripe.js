import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
    console.warn("Warning: STRIPE_SECRET_KEY is missing from environment variables.");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export default stripe;