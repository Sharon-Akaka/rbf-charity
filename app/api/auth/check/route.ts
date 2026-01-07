import { NextResponse } from "next/server";
import { isAuthenticated } from "@/backend/auth/utils";

export async function GET() {
  try {
    const authenticated = await isAuthenticated();

    return NextResponse.json(
      {
        authenticated,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { authenticated: false },
      { status: 200 }
    );
  }
}

