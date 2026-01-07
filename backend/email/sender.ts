import { Resend } from "resend";
import { RESEND_API_KEY, EMAIL_CONFIG } from "./config";
import { render } from "@react-email/render";
import ContactNotificationEmail from "./templates/contact-notification";

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

interface SendContactNotificationParams {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactNotification({
  name,
  email,
  subject,
  message,
}: SendContactNotificationParams) {
  if (!resend) {
    console.warn("Resend not configured. Email not sent.");
    return { success: false, error: "Email service not configured" };
  }

  try {
    const emailHtml = await render(
      ContactNotificationEmail({
        name,
        email,
        subject,
        message,
      })
    );

    const { data, error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.to,
      replyTo: email, // Reply to the person who submitted the form
      subject: `New Contact Form: ${subject}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    console.log("Email sent successfully:", data?.id);
    return { success: true, id: data?.id };
  } catch (error: any) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message || "Failed to send email" };
  }
}

