"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, CheckCircle } from "lucide-react";

interface FormData {
  email: string;
  fullName: string;
  address: string;
  telephone: string;
  declarationConsent: boolean;
  contributionMethod: string;
  signature: boolean;
  dateSigned: string;
}

const inputClass =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const labelClass = "text-sm font-medium leading-none";

export function MembershipForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<FormData>({
    email: "",
    fullName: "",
    address: "",
    telephone: "",
    declarationConsent: false,
    contributionMethod: "",
    signature: false,
    dateSigned: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const allComplete =
    !!formData.email &&
    !!formData.fullName &&
    !!formData.address &&
    !!formData.telephone &&
    formData.declarationConsent &&
    !!formData.contributionMethod &&
    formData.signature &&
    !!formData.dateSigned;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const [year, month, day] = formData.dateSigned.split("-").map(Number);

      const submitRes = await fetch("/api/membership-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          fullName: formData.fullName,
          address: formData.address,
          telephone: formData.telephone,
          declarationConsent: formData.declarationConsent,
          contributionMethod: formData.contributionMethod,
          signature: formData.signature,
          dateSigned: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
        }),
      });

      if (!submitRes.ok) {
        const data = (await submitRes.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error || "Submission failed");
      }

      setSuccess(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-8 text-center space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle className="h-7 w-7 text-primary" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-foreground">
          Welcome to the RBF!
        </h3>
        <p className="text-muted-foreground">
          Your membership application has been received. A member of the team
          will be in touch with you shortly.
        </p>
        <div className="rounded-md border-2 border-primary bg-primary/10 px-5 py-4 text-left">
          <p className="font-bold text-foreground">
            Please ensure that you have completed the standing order using the bank details provided.
          </p>
          <div className="mt-3 space-y-1 text-sm text-muted-foreground">
            <p><strong className="text-foreground">Bank:</strong> HSBC Bank UK</p>
            <p><strong className="text-foreground">Account Name:</strong> The Regentonians&apos; Benevolent Fund</p>
            <p><strong className="text-foreground">Sort Code:</strong> 401904</p>
            <p><strong className="text-foreground">Account Number:</strong> 82252872</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          We&apos;ve sent your application details, including your email
          address, through to the membership form for review.
        </p>
        <p className="text-sm text-muted-foreground">
          In the meantime, if you have any questions please don&apos;t hesitate
          to{" "}
          <a href="/contact" className="text-primary underline underline-offset-4">
            contact us
          </a>
          .
        </p>
        <div className="pt-2 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button onClick={() => router.push("/")}>Return to Home</Button>
          <Button onClick={() => router.push("/contribute")} variant="outline">
            Make a Contribution
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="email" className={labelClass}>Email *</label>
        <input
          id="email" name="email" type="email" required
          value={formData.email} onChange={handleChange}
          className={inputClass} placeholder="your.email@example.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="fullName" className={labelClass}>Full Name (First Name and Surname) *</label>
        <input
          id="fullName" name="fullName" type="text" required
          value={formData.fullName} onChange={handleChange}
          className={inputClass} placeholder="Your full name"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="address" className={labelClass}>Full Correspondence Address *</label>
        <input
          id="address" name="address" type="text" required
          value={formData.address} onChange={handleChange}
          className={inputClass} placeholder="Your full address"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="telephone" className={labelClass}>Contact Telephone Number *</label>
        <input
          id="telephone" name="telephone" type="tel" required
          value={formData.telephone} onChange={handleChange}
          className={inputClass} placeholder="Your phone number"
        />
      </div>

      <div className="rounded-md border border-border p-4 space-y-3">
        <p className="text-sm font-medium">Declaration &amp; Consent *</p>
        <p className="text-sm text-muted-foreground">
          I can confirm the information provided is accurate.
        </p>
        <p className="text-sm text-muted-foreground">
          I agree to join The Regentonians&apos; Benevolent Fund. I understand
          the membership terms and that my data will be used for membership
          administration in line with our privacy notice.
        </p>
        <p className="text-sm text-muted-foreground">
          I understand that all signed-up members MUST pay a minimum of £60 per
          year, to receive the benefits of the fund. Payment can be made as
          one-off lump of £60 or monthly standing order of £5 per month.
        </p>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox" name="declarationConsent" required
            checked={formData.declarationConsent} onChange={handleChange}
            className="h-4 w-4 rounded border-input"
          />
          <span className="text-sm">I agree</span>
        </label>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium">How I will make my contribution *</p>
        {["One-Off Lumpsum", "Annual Standing Order to £60", "Monthly Standing Order of £5"].map((option) => (
          <label key={option} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio" name="contributionMethod" value={option} required
              checked={formData.contributionMethod === option} onChange={handleChange}
              className="h-4 w-4"
            />
            <span className="text-sm">{option}</span>
          </label>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-lg">Bank Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm text-muted-foreground">
          <p>Our bank details are as follows:</p>
          <p><strong className="text-foreground">Bank:</strong> HSBC Bank UK</p>
          <p><strong className="text-foreground">Account Name:</strong> The Regentonians&apos; Benevolent Fund</p>
          <p><strong className="text-foreground">Sort Code:</strong> 401904</p>
          <p><strong className="text-foreground">Account Number:</strong> 82252872</p>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <p className="text-sm font-medium">Tick box below as signature *</p>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox" name="signature" required
            checked={formData.signature} onChange={handleChange}
            className="h-4 w-4 rounded border-input"
          />
          <span className="text-sm">Signed</span>
        </label>
      </div>

      <div className="space-y-2">
        <label htmlFor="dateSigned" className={labelClass}>Date signed *</label>
        <input
          id="dateSigned" name="dateSigned" type="date" required
          value={formData.dateSigned} onChange={handleChange}
          className={inputClass}
        />
      </div>

      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 p-4">
          <p className="text-sm font-medium text-red-800">{error}</p>
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting || !allComplete}>
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}
