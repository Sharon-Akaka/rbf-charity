import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Link,
} from "@react-email/components";
import * as React from "react";

interface DonationReceiptEmailProps {
  donorName?: string;
  amount: number;
  currency: string;
  purpose?: string;
  donationDate: string;
  sessionId: string;
}

export function DonationReceiptEmail({
  donorName,
  amount,
  currency,
  purpose,
  donationDate,
  sessionId,
}: DonationReceiptEmailProps) {
  const formatAmount = (amount: number, currency: string) => {
    const formatter = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: currency.toUpperCase(),
    });
    return formatter.format(amount / 100);
  };

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>Thank You for Your Donation</Heading>
            <Text style={subtitle}>The Regentonians Benevolent Fund</Text>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>
              {donorName ? `Dear ${donorName},` : "Dear Donor,"}
            </Text>

            <Text style={paragraph}>
              Thank you for your generous donation to The Regentonians
              Benevolent Fund. Your contribution helps us provide compassionate
              welfare support to alumni of Sierra Leone Grammar School during
              times of need.
            </Text>

            <Section style={detailsBox}>
              <Text style={label}>Donation Details</Text>
              <Text style={value}>
                <strong>Amount:</strong> {formatAmount(amount, currency)}
              </Text>
              {purpose && (
                <Text style={value}>
                  <strong>Purpose:</strong> {purpose}
                </Text>
              )}
              <Text style={value}>
                <strong>Date:</strong> {donationDate}
              </Text>
              <Text style={value}>
                <strong>Transaction ID:</strong> {sessionId}
              </Text>
            </Section>

            <Hr style={divider} />

            <Text style={paragraph}>
              Your donation is tax-deductible, and we will send you a formal
              receipt for your records. If you have any questions about your
              donation, please don't hesitate to{" "}
              <Link href="https://rbf-charity.vercel.app/contact" style={link}>
                contact us
              </Link>
              .
            </Text>

            <Text style={paragraph}>
              Once again, thank you for your support. Your generosity makes a
              real difference in the lives of our community members.
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>The Regentonians Benevolent Fund</Text>
            <Text style={footerText}>
              This is an automated receipt. Please keep this email for your
              records.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Email styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const header = {
  padding: "32px 24px",
  backgroundColor: "#7c3aed",
  borderRadius: "8px 8px 0 0",
};

const h1 = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 8px",
  fontFamily: '"Playfair Display", serif',
};

const subtitle = {
  color: "#e9d5ff",
  fontSize: "14px",
  margin: "0",
};

const content = {
  padding: "24px",
};

const paragraph = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 24px",
};

const detailsBox = {
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
  padding: "20px",
  margin: "24px 0",
};

const label = {
  color: "#6b7280",
  fontSize: "12px",
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  margin: "0 0 16px",
};

const value = {
  color: "#111827",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "8px 0",
};

const link = {
  color: "#7c3aed",
  textDecoration: "underline",
};

const divider = {
  borderColor: "#e5e7eb",
  margin: "24px 0",
};

const footer = {
  padding: "24px",
  borderTop: "1px solid #e5e7eb",
  backgroundColor: "#f9fafb",
};

const footerText = {
  color: "#6b7280",
  fontSize: "12px",
  lineHeight: "18px",
  margin: "4px 0",
};

export default DonationReceiptEmail;
