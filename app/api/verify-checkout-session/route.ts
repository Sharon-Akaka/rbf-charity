import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendDonationReceipt } from "@/backend/email/sender";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-12-15.clover",
    })
  : null;

export async function GET(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe is not configured" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // If payment is successful and we have customer email, send receipt
    if (
      session.payment_status === "paid" &&
      session.customer_email &&
      session.amount_total
    ) {
      // Check if we've already sent a receipt (using metadata flag)
      const receiptSent = session.metadata?.receipt_sent === "true";

      if (!receiptSent) {
        // Get customer name if available
        let customerName: string | undefined;
        if (session.customer) {
          try {
            const customer = await stripe.customers.retrieve(
              session.customer as string
            );
            if (!customer.deleted && "name" in customer && customer.name) {
              customerName = customer.name;
            }
          } catch (err) {
            // Customer might not exist or be accessible, continue without name
            console.log("Could not retrieve customer name:", err);
          }
        }

        // Format donation date
        const donationDate = new Date().toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        // Send receipt email (non-blocking - don't fail if email fails)
        try {
          const emailResult = await sendDonationReceipt({
            donorEmail: session.customer_email,
            donorName: customerName,
            amount: session.amount_total,
            currency: session.currency || "gbp",
            purpose: session.metadata?.purpose,
            donationDate,
            sessionId: session.id,
          });

          if (emailResult.success) {
            // Mark receipt as sent in session metadata
            await stripe.checkout.sessions.update(sessionId, {
              metadata: {
                ...session.metadata,
                receipt_sent: "true",
              },
            });
            console.log("Donation receipt sent successfully");
          } else {
            console.error("Failed to send donation receipt:", emailResult.error);
          }
        } catch (emailError) {
          console.error("Error sending donation receipt:", emailError);
          // Continue anyway - session verification was successful
        }
      }
    }

    return NextResponse.json({
      success: true,
      session: {
        id: session.id,
        paymentStatus: session.payment_status,
        amountTotal: session.amount_total,
        currency: session.currency,
        customerEmail: session.customer_email,
        metadata: session.metadata,
      },
    });
  } catch (error: any) {
    console.error("Stripe session verification error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to verify session" },
      { status: 500 }
    );
  }
}

