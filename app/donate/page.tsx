"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Hero } from "@/components/hero";
import { DonationForm } from "@/components/donation-form";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, CheckCircle, XCircle } from "lucide-react";

export default function DonatePage() {
  const searchParams = useSearchParams();
  const canceled = searchParams.get("canceled");
  const [showCanceled, setShowCanceled] = useState(false);

  useEffect(() => {
    if (canceled === "true") {
      setShowCanceled(true);
      // Clear the URL parameter after showing the message
      window.history.replaceState({}, "", "/donate");
      // Hide the message after 10 seconds
      const timer = setTimeout(() => setShowCanceled(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [canceled]);

  return (
    <div className="flex min-h-screen flex-col">
      <Hero
        title="Support RBF"
        description="Your donation helps us provide compassionate welfare support to alumni of Sierra Leone Grammar School during times of need."
        imageUrl="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&h=1080&fit=crop"
        imageAlt="Support and community"
      />

      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {showCanceled && (
            <div className="mb-6 mx-auto max-w-2xl">
              <Card className="border-yellow-200 bg-yellow-50 animate-fade-in-up">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <XCircle className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-yellow-900 mb-1">
                        Payment Canceled
                      </h3>
                      <p className="text-sm text-yellow-800">
                        Your payment was canceled. No charges were made. If you
                        encountered any issues, please try again or{" "}
                        <a href="/contact" className="underline font-medium">
                          contact us
                        </a>{" "}
                        for assistance.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowCanceled(false)}
                      className="shrink-0 text-yellow-600 hover:text-yellow-800"
                      aria-label="Dismiss"
                    >
                      <XCircle className="h-5 w-5" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <DonationForm />

          {/* Why Donate Section */}
          <div className="mt-16 mx-auto max-w-4xl">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-center text-foreground sm:text-4xl mb-12">
              Why Your Donation Matters
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <Card className="animate-fade-in-up animation-delay-200">
                <CardContent className="pt-6 text-center">
                  <Heart className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-semibold mb-2">
                    Bereavement Support
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Help us provide "Cry Berrin" assistance to families during
                    difficult times.
                  </p>
                </CardContent>
              </Card>
              <Card className="animate-fade-in-up animation-delay-400">
                <CardContent className="pt-6 text-center">
                  <CheckCircle className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-semibold mb-2">
                    Get Well Soon
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Support fellow Regentonians during illness and recovery.
                  </p>
                </CardContent>
              </Card>
              <Card className="animate-fade-in-up animation-delay-600">
                <CardContent className="pt-6 text-center">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-semibold mb-2">
                    Milestone Recognition
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Celebrate special birthdays and milestones in our community.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Transparency Note */}
          <Card className="mt-12 bg-muted max-w-2xl mx-auto">
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground">
                The Regentonians Benevolent Fund is member-funded and
                transparently managed. Your donation directly supports our
                community members in times of need.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
