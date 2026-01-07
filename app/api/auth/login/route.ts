import { NextRequest, NextResponse } from "next/server";
import { AUTH_CONFIG } from "@/backend/auth/config";
import { createSession } from "@/backend/auth/utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validate credentials
    if (
      username === AUTH_CONFIG.username &&
      password === AUTH_CONFIG.password
    ) {
      await createSession();

      return NextResponse.json(
        {
          success: true,
          message: "Login successful",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Failed to process login" },
      { status: 500 }
    );
  }
}

