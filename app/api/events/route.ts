import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/backend/db/connection";
import Event from "@/backend/models/Event";

// GET - Fetch all active events
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get("includeInactive") === "true";

    const query = includeInactive ? {} : { isActive: true };

    const events = await Event.find(query)
      .sort({ date: 1 }) // Sort by date ascending (upcoming first)
      .select("-__v");

    return NextResponse.json({
      success: true,
      data: events,
      count: events.length,
    });
  } catch (error) {
    console.error("Get events error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve events" },
      { status: 500 }
    );
  }
}

// POST - Create a new event (admin only in production)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { title, description, date, time, location, imageUrl } = body;

    // Validation
    if (!title || !description || !date || !time || !location) {
      return NextResponse.json(
        { error: "Title, description, date, time, and location are required" },
        { status: 400 }
      );
    }

    const event = await Event.create({
      title,
      description,
      date: new Date(date),
      time,
      location,
      imageUrl: imageUrl || undefined,
      isActive: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Event created successfully",
        data: event,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Create event error:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: errors.join(", ") },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}

