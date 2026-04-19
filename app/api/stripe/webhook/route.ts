import { NextRequest, NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";
import Stripe from "stripe";

// Next.js App Router gives us the raw body via req.text() — no special config needed.
export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    console.error("[webhook] Missing stripe-signature header");
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("[webhook] STRIPE_WEBHOOK_SECRET is not configured");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  // --- Verify signature ---
  let event: Stripe.Event;
  try {
    const stripe = getStripeClient();
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error("[webhook] Signature verification failed:", err.message);
    return NextResponse.json(
      { error: `Webhook signature error: ${err.message}` },
      { status: 400 }
    );
  }

  console.log(`[webhook] Received: ${event.type} (id=${event.id})`);

  // --- Handle events ---
  switch (event.type) {
    // ---------------------------------------------------------------
    // ONE-OFF PAYMENTS
    // ---------------------------------------------------------------

    case "payment_intent.succeeded": {
      const pi = event.data.object as Stripe.PaymentIntent;
      console.log(
        `[payment_intent.succeeded] id=${pi.id}` +
          ` amount=${pi.amount / 100} ${pi.currency.toUpperCase()}` +
          ` purpose="${pi.metadata.purpose ?? ""}"`
      );
      // TODO: record payment in your database, trigger confirmation email, etc.
      break;
    }

    case "payment_intent.payment_failed": {
      const pi = event.data.object as Stripe.PaymentIntent;
      const reason = pi.last_payment_error?.message ?? "unknown reason";
      console.error(
        `[payment_intent.payment_failed] id=${pi.id} reason="${reason}"`
      );
      // TODO: notify customer, log to your monitoring tool, add retry logic if appropriate.
      break;
    }

    // ---------------------------------------------------------------
    // SUBSCRIPTIONS — invoices
    // ---------------------------------------------------------------

    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      const subId =
        invoice.parent?.subscription_details?.subscription ?? "none";
      console.log(
        `[invoice.paid] id=${invoice.id}` +
          ` customer=${invoice.customer}` +
          ` subscription=${subId}` +
          ` amount=${(invoice.amount_paid ?? 0) / 100} ${invoice.currency.toUpperCase()}`
      );
      // TODO: provision/extend member access, send receipt email, update subscription
      //       status in your database.
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const subId =
        invoice.parent?.subscription_details?.subscription ?? "none";
      console.error(
        `[invoice.payment_failed] id=${invoice.id}` +
          ` customer=${invoice.customer}` +
          ` subscription=${subId}` +
          ` attempt=${invoice.attempt_count}` +
          ` next_attempt=${invoice.next_payment_attempt ?? "none"}`
      );
      // TODO: notify customer, mark subscription as past_due in your database,
      //       suspend access after Stripe exhausts its retry schedule.
      break;
    }

    // ---------------------------------------------------------------
    // SUBSCRIPTIONS — lifecycle
    // ---------------------------------------------------------------

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      console.log(
        `[customer.subscription.deleted] id=${sub.id}` +
          ` customer=${sub.customer}` +
          ` canceled_at=${sub.canceled_at ?? "N/A"}`
      );
      // TODO: revoke member access, update subscription status in your database,
      //       send a cancellation acknowledgement email.
      break;
    }

    // ---------------------------------------------------------------
    // Unhandled — log so you can add handlers later
    // ---------------------------------------------------------------
    default:
      console.log(`[webhook] Unhandled event type: ${event.type}`);
  }

  // Stripe requires a 200 response to acknowledge receipt
  return NextResponse.json({ received: true });
}
