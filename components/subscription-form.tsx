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
import { Loader2, ArrowLeft, RefreshCw } from "lucide-react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

type Interval = "month" | "year";

const MINIMUMS: Record<Interval, number> = { month: 5, year: 60 };
const intervalLabel: Record<Interval, string> = { month: "/month", year: "/year" };

const BILLING_DAYS = [1, 5, 10, 15, 20, 25];

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// ─── Inner confirmation form (must live inside <Elements>) ────────────────────

interface SubscriptionResult {
  firstPayment: string;
  renewal: string;
  billingDay: number;
  interval: Interval;
}

interface ConfirmFormProps {
  planName: string;
  amount: number;
  interval: Interval;
  billingDay: number;
  currency: string;
  email: string;
  name: string;
  onBack: () => void;
  onSuccess: (result: SubscriptionResult) => void;
}

function ConfirmForm({
  planName,
  amount,
  interval,
  billingDay,
  currency,
  email,
  name,
  onBack,
  onSuccess,
}: ConfirmFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(n);

  const fmtDate = (ts: number) =>
    new Date(ts * 1000).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    // Step A: Save the card via the SetupIntent
    const { error: setupError, setupIntent } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/contribute/success`,
      },
      redirect: "if_required",
    });

    if (setupError) {
      setError(setupError.message ?? "Card setup failed. Please try again.");
      setLoading(false);
      return;
    }

    const paymentMethodId =
      typeof setupIntent?.payment_method === "string"
        ? setupIntent.payment_method
        : setupIntent?.payment_method?.id;

    if (!paymentMethodId) {
      setError("Could not retrieve payment method. Please try again.");
      setLoading(false);
      return;
    }

    // Step B: Create subscription with the saved payment method + billing day
    try {
      const res = await fetch("/api/stripe/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMethodId,
          interval,
          amount,
          email,
          name: name || undefined,
          billingDay,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      onSuccess({
        firstPayment: fmtDate(data.firstPaymentTs),
        renewal: fmtDate(data.renewalTs),
        billingDay: data.billingDay,
        interval,
      });
    } catch (err: any) {
      setError(err.message || "Failed to activate subscription. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-lg bg-muted p-4 text-sm space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Plan</span>
          <span className="font-semibold">{planName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Amount</span>
          <span className="font-semibold">
            {fmt(amount)}{intervalLabel[interval]}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Billing day</span>
          <span className="font-semibold">
            {interval === "month"
              ? `${ordinal(billingDay)} of each month`
              : `${ordinal(billingDay)} of the month, annually`}
          </span>
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
              Setting up subscription...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Confirm Subscription
            </>
          )}
        </Button>
      </div>

      <p className="text-xs text-center text-muted-foreground">
        Your card is saved now but you won't be charged until your first billing
        date. Cancel any time by contacting us.
      </p>
    </form>
  );
}

// ─── Outer component ──────────────────────────────────────────────────────────

export interface SubscriptionFormProps {
  planName: string;
  currency?: string;
}

type Step = "details" | "payment" | "complete";

export function SubscriptionForm({
  planName,
  currency = "gbp",
}: SubscriptionFormProps) {
  const [step, setStep] = useState<Step>("details");
  const [interval, setInterval] = useState<Interval>("month");
  const [chosenAmount, setChosenAmount] = useState("5");
  const [billingDay, setBillingDay] = useState(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [subResult, setSubResult] = useState<SubscriptionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const minimum = MINIMUMS[interval];
  const parsedAmount = parseFloat(chosenAmount) || 0;

  const handleIntervalChange = (next: Interval) => {
    setInterval(next);
    setChosenAmount(String(MINIMUMS[next]));
    setError("");
  };

  const handleContinue = async () => {
    if (parsedAmount < minimum) {
      setError(`Minimum amount is £${minimum}${intervalLabel[interval]}.`);
      return;
    }
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/stripe/create-setup-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: name || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setClientSecret(data.clientSecret);
      setStep("payment");
    } catch (err: any) {
      setError(err.message || "Failed to initialise. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(n);

  if (step === "complete" && subResult) {
    return (
      <Card className="max-w-2xl mx-auto animate-fade-in-up">
        <CardContent className="pt-12 pb-8 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mx-auto">
            <RefreshCw className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight mb-4">
            Subscription Set Up
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Thank you! Your card has been saved and your first contribution will
            be collected on your chosen date.
          </p>

          <div className="rounded-lg bg-muted p-6 text-left space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-semibold">
                {fmt(parsedAmount)}{intervalLabel[subResult.interval]}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">First payment</span>
              <span className="font-semibold">{subResult.firstPayment}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Then every</span>
              <span className="font-semibold">
                {subResult.interval === "month"
                  ? `${ordinal(subResult.billingDay)} of each month`
                  : `${ordinal(subResult.billingDay)} of the month, annually`}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Next renewal after that</span>
              <span className="font-semibold">{subResult.renewal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Receipt sent to</span>
              <span className="font-semibold">{email}</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            To cancel or make changes, please{" "}
            <a href="/contact" className="underline">contact us</a>.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto animate-fade-in-up">
      <CardHeader className="text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
          <RefreshCw className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-3xl">
          {step === "details" ? planName : "Payment Details"}
        </CardTitle>
        <CardDescription className="text-base mt-2">
          {step === "details"
            ? "Choose how often you'd like to contribute and set your amount."
            : "Enter your card details — you won't be charged until your billing date."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {step === "details" && (
          <div className="space-y-6">
            {/* Interval toggle */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Billing Interval</label>
              <div className="grid grid-cols-2 gap-3">
                {(["month", "year"] as Interval[]).map((iv) => (
                  <button
                    key={iv}
                    type="button"
                    onClick={() => handleIntervalChange(iv)}
                    className={`rounded-md border-2 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      interval === iv
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input bg-background hover:border-primary/50 hover:bg-accent"
                    }`}
                  >
                    {iv === "month" ? "Monthly" : "Yearly"}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <label htmlFor="sub-amount" className="text-sm font-medium">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  £
                </span>
                <input
                  id="sub-amount"
                  type="number"
                  min={minimum}
                  step="1"
                  value={chosenAmount}
                  onChange={(e) => {
                    setChosenAmount(e.target.value);
                    setError("");
                  }}
                  className="flex h-10 w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Minimum £{minimum}{intervalLabel[interval]}
              </p>
            </div>

            {/* Preferred billing date */}
            <div className="space-y-2">
              <label htmlFor="sub-billing-day" className="text-sm font-medium">
                Preferred Billing Date
              </label>
              <select
                id="sub-billing-day"
                value={billingDay}
                onChange={(e) => setBillingDay(Number(e.target.value))}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {BILLING_DAYS.map((d) => (
                  <option key={d} value={d}>
                    {ordinal(d)} of the month
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground">
                {interval === "month"
                  ? "Your card won't be charged until this date. If it has already passed this month, your first payment will be next month."
                  : "Your annual payment will fall on this day. If this date hasn't passed yet this month, your first payment will be this month — otherwise next month."}
              </p>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="sub-name" className="text-sm font-medium">
                Full Name (Optional)
              </label>
              <input
                id="sub-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="sub-email" className="text-sm font-medium">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="sub-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="you@example.com"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <p className="text-xs text-muted-foreground">
                Used for receipts and subscription management.
              </p>
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
              disabled={loading || !email || parsedAmount < minimum}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Setting up...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Continue — {parsedAmount >= minimum ? fmt(parsedAmount) : `£${minimum}`}
                  {intervalLabel[interval]} from the {ordinal(billingDay)}
                </>
              )}
            </Button>
          </div>
        )}

        {step === "payment" && clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret, appearance: { theme: "stripe" } }}
          >
            <ConfirmForm
              planName={planName}
              amount={parsedAmount}
              interval={interval}
              billingDay={billingDay}
              currency={currency}
              email={email}
              name={name}
              onBack={() => setStep("details")}
              onSuccess={(result) => {
                setSubResult(result);
                setStep("complete");
              }}
            />
          </Elements>
        )}
      </CardContent>
    </Card>
  );
}
