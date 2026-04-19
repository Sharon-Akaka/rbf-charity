import { NextRequest, NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";

type Interval = "month" | "year";

const MINIMUM_PENCE: Record<Interval, number> = {
  month: 500,  // £5
  year: 6000,  // £60
};

const VALID_BILLING_DAYS = [1, 5, 10, 15, 20, 25];

/**
 * Returns the Unix timestamp for the next future occurrence of `day` in the
 * month. If that day is today or has already passed this month, we use next
 * month. Requires at least 1 day in the future so Stripe accepts it.
 */
function nextBillingAnchor(day: number): number {
  const now = new Date();
  const minDate = new Date(now);
  minDate.setDate(minDate.getDate() + 1);
  minDate.setHours(0, 0, 0, 0);

  const thisMonth = new Date(now.getFullYear(), now.getMonth(), day, 0, 0, 0);

  const anchor =
    thisMonth > minDate
      ? thisMonth
      : new Date(now.getFullYear(), now.getMonth() + 1, day, 0, 0, 0);

  return Math.floor(anchor.getTime() / 1000);
}

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripeClient();
    const { paymentMethodId, interval, amount, email, name, billingDay } =
      await req.json();

    // --- 1. Validate inputs ---
    if (!paymentMethodId) {
      return NextResponse.json(
        { error: "paymentMethodId is required" },
        { status: 400 }
      );
    }
    if (!interval || !["month", "year"].includes(interval)) {
      return NextResponse.json(
        { error: "interval must be 'month' or 'year'" },
        { status: 400 }
      );
    }
    if (!email) {
      return NextResponse.json({ error: "email is required" }, { status: 400 });
    }
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { error: "amount must be a positive number" },
        { status: 400 }
      );
    }
    if (!billingDay || !VALID_BILLING_DAYS.includes(Number(billingDay))) {
      return NextResponse.json(
        { error: `billingDay must be one of: ${VALID_BILLING_DAYS.join(", ")}` },
        { status: 400 }
      );
    }

    // --- 2. Server-side minimum amount check ---
    const amountPence = Math.round(amount * 100);
    const minimumPence = MINIMUM_PENCE[interval as Interval];

    if (amountPence < minimumPence) {
      return NextResponse.json(
        { error: `Minimum contribution is £${minimumPence / 100}/${interval}.` },
        { status: 400 }
      );
    }

    // --- 3. Require a product ID ---
    if (!process.env.STRIPE_PRODUCT_ID) {
      console.error("[create-subscription] STRIPE_PRODUCT_ID is not configured");
      return NextResponse.json(
        { error: "Subscription product is not configured" },
        { status: 500 }
      );
    }

    // --- 4. Find or create customer ---
    const existingCustomers = await stripe.customers.list({ email, limit: 1 });
    const customer =
      existingCustomers.data.length > 0
        ? existingCustomers.data[0]
        : await stripe.customers.create({ email, name: name || undefined });

    // --- 5. Attach payment method and set as default ---
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.id,
    });
    await stripe.customers.update(customer.id, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });

    // --- 6. Create dynamic price ---
    const price = await stripe.prices.create({
      unit_amount: amountPence,
      currency: "gbp",
      recurring: { interval: interval as Interval },
      product: process.env.STRIPE_PRODUCT_ID,
    });

    // --- 7. Calculate billing anchor ---
    // billing_cycle_anchor sets the day billing repeats on.
    // proration_behavior: "none" means no charge until the anchor date —
    // the user pays nothing between signup and their chosen billing day.
    const anchorTs = nextBillingAnchor(Number(billingDay));

    // --- 8. Create subscription ---
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price.id }],
      default_payment_method: paymentMethodId,
      billing_cycle_anchor: anchorTs,
      proration_behavior: "none",
      expand: ["latest_invoice"],
    });

    console.log(
      `[create-subscription] id=${subscription.id} status=${subscription.status}` +
        ` billingDay=${billingDay} firstPayment=${new Date(anchorTs * 1000).toDateString()}`
    );

    // Renewal is one interval after the anchor
    const renewalDate = new Date(anchorTs * 1000);
    if (interval === "month") renewalDate.setMonth(renewalDate.getMonth() + 1);
    else renewalDate.setFullYear(renewalDate.getFullYear() + 1);

    return NextResponse.json({
      subscriptionId: subscription.id,
      status: subscription.status,
      firstPaymentTs: anchorTs,
      renewalTs: Math.floor(renewalDate.getTime() / 1000),
      billingDay: Number(billingDay),
    });
  } catch (error: any) {
    console.error("[create-subscription]", error);
    return NextResponse.json(
      { error: error.message || "Failed to create subscription" },
      { status: 500 }
    );
  }
}
