"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Loader2, ArrowLeft } from "lucide-react";

// Initialised once at module level — never inside a component
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

const suggestedAmounts = [25, 50, 100, 250, 500];

const purposeOptions = [
  { value: "", label: "General Support" },
  { value: "Bereavement Support", label: "Bereavement Support" },
  { value: "Get Well Soon", label: "Get Well Soon" },
  { value: "Milestone Birthday", label: "Milestone Birthday" },
  { value: "Mentoring Scheme", label: "Mentoring Scheme" },
];

// ─── Inner confirmation form (must live inside <Elements>) ────────────────────

interface ConfirmFormProps {
  amount: number;
  currency: string;
  onBack: () => void;
}

function ConfirmForm({ amount, currency, onBack }: ConfirmFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatted = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Stripe redirects here on success — reuses the existing success page
        return_url: `${window.location.origin}/contribute/success`,
      },
    });

    // confirmPayment only returns here if there was an error (otherwise it redirects)
    if (confirmError) {
      setError(confirmError.message ?? "Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-lg bg-muted p-4 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Amount</span>
          <span className="font-semibold">{formatted}</span>
        </div>
      </div>

      <PaymentElement />

      {error && (
        <div className="rounded-md bg-red-50 p-3 text-red-800 border border-red-200">
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={loading}
          className="sm:w-auto"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          type="submit"
          size="lg"
          className="flex-1 transition-transform duration-200 hover:scale-105"
          disabled={!stripe || loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Heart className="mr-2 h-4 w-4" />
              Pay {formatted}
            </>
          )}
        </Button>
      </div>

      <p className="text-xs text-center text-muted-foreground">
        Secure payment powered by Stripe. Your card details are never stored on
        our servers.
      </p>
    </form>
  );
}

// ─── Outer component — handles amount selection and PaymentIntent creation ────

export function PaymentIntentForm() {
  const [step, setStep] = useState<"amount" | "payment">("amount");
  const [amount, setAmount] = useState<number | "">("");
  const [customAmount, setCustomAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resolvedAmount =
    typeof amount === "number" ? amount : parseFloat(customAmount) || 0;

  const handleAmountSelect = (value: number) => {
    setAmount(value);
    setCustomAmount("");
    setError("");
  };

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value);
    setAmount("");
    setError("");
  };

  const handleContinue = async () => {
    if (!resolvedAmount || resolvedAmount < 1) {
      setError("Please enter a valid amount (minimum £1)");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: resolvedAmount,
          currency: "gbp",
          purpose: purpose || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setClientSecret(data.clientSecret);
      setStep("payment");
    } catch (err: any) {
      setError(err.message || "Failed to initialise payment. Please try again.");
    } finally {
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
          {step === "amount"
            ? "Choose an amount and we'll take you straight to payment — no redirect."
            : "Enter your card details to complete your contribution."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {step === "amount" ? (
          <div className="space-y-6">
            {/* Suggested amounts */}
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

            {/* Custom amount */}
            <div className="space-y-2">
              <label htmlFor="pi-customAmount" className="text-sm font-medium">
                Or enter custom amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  £
                </span>
                <input
                  id="pi-customAmount"
                  type="number"
                  min="1"
                  step="0.01"
                  value={customAmount}
                  onChange={(e) => handleCustomAmount(e.target.value)}
                  placeholder="0.00"
                  className="flex h-10 w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>

            {/* Purpose */}
            <div className="space-y-2">
              <label htmlFor="pi-purpose" className="text-sm font-medium">
                Contribution Purpose (Optional)
              </label>
              <select
                id="pi-purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {purposeOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-3 text-red-800 border border-red-200">
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <Button
              onClick={handleContinue}
              size="lg"
              className="w-full transition-transform duration-200 hover:scale-105"
              disabled={loading || !resolvedAmount}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Preparing...
                </>
              ) : (
                <>
                  <Heart className="mr-2 h-4 w-4" />
                  Continue to Payment
                  {resolvedAmount >= 1
                    ? ` — £${resolvedAmount.toFixed(2)}`
                    : ""}
                </>
              )}
            </Button>
          </div>
        ) : (
          // Payment step — Elements must receive a valid clientSecret
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: { theme: "stripe" },
            }}
          >
            <ConfirmForm
              amount={resolvedAmount}
              currency="gbp"
              onBack={() => setStep("amount")}
            />
          </Elements>
        )}
      </CardContent>
    </Card>
  );
}
