import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/backend/db/connection";
import Contact from "@/backend/models/Contact";
import { sendContactNotification } from "@/backend/email/sender";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Create contact submission
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // Send email notification (non-blocking - don't fail if email fails)
    try {
      const emailResult = await sendContactNotification({
        name,
        email,
        subject,
        message,
      });

      if (!emailResult.success) {
        console.error("Failed to send email notification:", emailResult.error);
        // Continue anyway - form submission was successful
      }
    } catch (emailError) {
      console.error("Error sending email notification:", emailError);
      // Continue anyway - form submission was successful
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message. We'll get back to you soon!",
        data: {
          id: contact._id,
          name: contact.name,
          email: contact.email,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Contact form error:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: errors.join(", ") },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to submit contact form. Please try again." },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve contact submissions (admin only)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // In production, add authentication here
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");

    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .select("-__v");

    const total = await Contact.countDocuments();

    return NextResponse.json({
      success: true,
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get contacts error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve contacts" },
      { status: 500 }
    );
  }
}

