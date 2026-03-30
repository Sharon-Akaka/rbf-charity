"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Loader2 } from "lucide-react";

const suggestedAmounts = [25, 50, 100, 250, 500];

export function DonationForm() {
  // const router = useRouter();
  const [amount, setAmount] = useState<number | "">("");
  const [customAmount, setCustomAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAmountSelect = (value: number) => {
    setAmount(value);
    setCustomAmount("");
  };

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value);
    setAmount("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const donationAmount = amount || parseFloat(customAmount);

    if (!donationAmount || donationAmount < 1) {
      setError("Please enter a valid contribution amount (minimum £1)");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: donationAmount,
          currency: "gbp",
          purpose: purpose || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe Checkout using the session URL
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received from server");
      }
    } catch (err: unknown) {
      console.error("Contribution error:", err);
      const message =
        err instanceof Error
          ? err.message
          : "An error occurred. Please try again.";
      setError(message);
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto animate-fade-in-up">
      <CardHeader className="text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
          <Heart className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-3xl">Make a Contribution</CardTitle>
        <CardDescription className="text-base mt-2">
          Your one-off contribution helps us provide compassionate welfare
          support to alumni of Sierra Leone Grammar School during times of need.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Suggested Amounts */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Select Amount</label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {suggestedAmounts.map((suggested) => (
                <button
                  key={suggested}
                  type="button"
                  onClick={() => handleAmountSelect(suggested)}
                  className={`rounded-md border-2 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    amount === suggested
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-background hover:border-primary/50 hover:bg-accent"
                  }`}
                >
                  £{suggested}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="space-y-2">
            <label htmlFor="customAmount" className="text-sm font-medium">
              Or enter custom amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                £
              </span>
              <input
                id="customAmount"
                type="number"
                min="1"
                step="0.01"
                value={customAmount}
                onChange={(e) => handleCustomAmount(e.target.value)}
                placeholder="0.00"
                className="flex h-10 w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          {/* Contribution Purpose (Optional) */}
          <div className="space-y-2">
            <label htmlFor="purpose" className="text-sm font-medium">
              Contribution Purpose (Optional)
            </label>
            <select
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">General Support</option>
              <option value="Bereavement Support">Bereavement Support</option>
              <option value="Get Well Soon">Get Well Soon</option>
              <option value="Milestone Birthday">Milestone Birthday</option>
              <option value="Mentoring Scheme">Mentoring Scheme</option>
            </select>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-3 text-red-800 border border-red-200">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full transition-transform duration-200 hover:scale-105"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Heart className="mr-2 h-4 w-4" />
                Contribute
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Secure payment powered by Stripe. Your contribution is processed
            safely and securely.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
