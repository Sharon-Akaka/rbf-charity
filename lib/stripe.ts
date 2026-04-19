import Stripe from "stripe";

/**
 * Returns a Stripe client initialised with the secret key.
 * Call this inside route handlers — never import it in client components.
 */
export function getStripeClient(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error(
      "STRIPE_SECRET_KEY environment variable is not configured. " +
        "Add it to .env.local (test: sk_test_…, live: sk_live_…)."
    );
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-12-15.clover",
  });
}
