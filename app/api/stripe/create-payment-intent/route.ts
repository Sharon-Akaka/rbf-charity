import { NextRequest, NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripeClient();
    const { amount, currency = "gbp", purpose } = await req.json();

    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: "Invalid amount — must be at least £1" },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert pounds → pence
      currency: currency.toLowerCase(),
      automatic_payment_methods: { enabled: true },
      metadata: {
        purpose: purpose || "General Support",
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error("[create-payment-intent]", error);
    return NextResponse.json(
      { error: error.message || "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
