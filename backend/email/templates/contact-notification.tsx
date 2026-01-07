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

interface ContactNotificationEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactNotificationEmail({
  name,
  email,
  subject,
  message,
}: ContactNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>New Contact Form Submission</Heading>
            <Text style={subtitle}>The Regentonians Benevolent Fund</Text>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>
              You have received a new message through the contact form on the
              RBF website.
            </Text>

            <Section style={detailsBox}>
              <Text style={label}>From:</Text>
              <Text style={value}>{name}</Text>

              <Text style={label}>Email:</Text>
              <Text style={value}>
                <Link href={`mailto:${email}`} style={link}>
                  {email}
                </Link>
              </Text>

              <Text style={label}>Subject:</Text>
              <Text style={value}>{subject}</Text>
            </Section>

            <Hr style={divider} />

            <Text style={label}>Message:</Text>
            <Section style={messageBox}>
              <Text style={messageText}>{message}</Text>
            </Section>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              This email was sent from the RBF Charity website contact form.
            </Text>
            <Text style={footerText}>
              Please respond directly to {email} to reply to this inquiry.
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
  margin: "16px 0 4px",
};

const value = {
  color: "#111827",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 8px",
};

const link = {
  color: "#7c3aed",
  textDecoration: "underline",
};

const divider = {
  borderColor: "#e5e7eb",
  margin: "24px 0",
};

const messageBox = {
  backgroundColor: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "16px",
  marginTop: "8px",
};

const messageText = {
  color: "#374151",
  fontSize: "15px",
  lineHeight: "22px",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
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

export default ContactNotificationEmail;
