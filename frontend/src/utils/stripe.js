import { loadStripe } from "@stripe/stripe-js";

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "";

const stripePromise = loadStripe(publishableKey);

export default stripePromise;
