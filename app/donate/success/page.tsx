"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Hero } from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Heart, Home, Loader2, XCircle } from "lucide-react";
import Link from "next/link";

interface SessionData {
  id: string;
  paymentStatus: string;
  amountTotal: number;
  currency: string;
  customerEmail: string | null;
  metadata: {
    purpose?: string;
  };
}

export default function DonateSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError("No session ID provided");
      setLoading(false);
      return;
    }

    // Verify the session with Stripe
    const verifySession = async () => {
      try {
        const response = await fetch(
          `/api/verify-checkout-session?session_id=${sessionId}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to verify session");
        }

        if (data.session.paymentStatus === "paid") {
          setSessionData(data.session);
        } else {
          setError(
            `Payment status: ${data.session.paymentStatus}. Please contact support if you were charged.`
          );
        }
      } catch (err: any) {
        console.error("Session verification error:", err);
        setError(
          err.message || "Failed to verify payment. Please contact support."
        );
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [sessionId]);

  const formatAmount = (amount: number, currency: string) => {
    const formatter = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: currency.toUpperCase(),
    });
    return formatter.format(amount / 100); // Convert from pence/cents
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Hero
          title="Processing..."
          description="Verifying your donation"
          imageUrl="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop"
          imageAlt="Processing"
        />
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl">
              <Card className="animate-fade-in-up">
                <CardContent className="pt-12 pb-8 text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground">
                    Verifying your payment...
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error || !sessionData) {
    return (
      <div className="flex min-h-screen flex-col">
        <Hero
          title="Payment Verification"
          description="We're checking your payment status"
          imageUrl="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop"
          imageAlt="Verification"
        />
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl">
              <Card className="animate-fade-in-up">
                <CardContent className="pt-12 pb-8 text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 mx-auto">
                    <XCircle className="h-12 w-12 text-red-600" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground mb-4">
                    Verification Issue
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    {error ||
                      "We couldn't verify your payment. Please contact us if you were charged."}
                  </p>
                  <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button
                      href="/"
                      size="lg"
                      className="transition-transform duration-200 hover:scale-105"
                    >
                      <Home className="mr-2 h-4 w-4" />
                      Return Home
                    </Button>
                    <Button
                      href="/contact"
                      variant="outline"
                      size="lg"
                      className="transition-transform duration-200 hover:scale-105"
                    >
                      Contact Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Hero
        title="Thank You!"
        description="Your donation has been received. We're grateful for your support."
        imageUrl="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop"
        imageAlt="Thank you"
      />

      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <Card className="animate-fade-in-up">
              <CardContent className="pt-12 pb-8 text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mx-auto">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground mb-4">
                  Donation Successful
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Thank you for your generous contribution to The Regentonians
                  Benevolent Fund. Your support helps us continue providing
                  compassionate welfare assistance to our community.
                </p>

                {/* Donation Details */}
                <div className="mb-8 rounded-lg bg-muted p-6 text-left">
                  <h3 className="font-semibold mb-4">Donation Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="font-semibold">
                        {formatAmount(
                          sessionData.amountTotal,
                          sessionData.currency
                        )}
                      </span>
                    </div>
                    {sessionData.metadata.purpose && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Purpose:</span>
                        <span className="font-semibold">
                          {sessionData.metadata.purpose}
                        </span>
                      </div>
                    )}
                    {sessionData.customerEmail && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-semibold">
                          {sessionData.customerEmail}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="font-semibold text-green-600">Paid</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button
                    href="/"
                    size="lg"
                    className="transition-transform duration-200 hover:scale-105"
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Return Home
                  </Button>
                  <Button
                    href="/donate"
                    variant="outline"
                    size="lg"
                    className="transition-transform duration-200 hover:scale-105"
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Donate Again
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-8 bg-muted">
              <CardContent className="pt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  A receipt has been sent to your email address. If you have any
                  questions about your donation, please{" "}
                  <Link
                    href="/contact"
                    className="text-primary hover:underline"
                  >
                    contact us
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
