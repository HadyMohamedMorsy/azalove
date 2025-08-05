import { authCookies } from "@/utils/cookies";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Get token from cookies instead of request body
    const token = authCookies.getToken();

    if (!token) {
      return NextResponse.json(
        { error: "No token found in cookies" },
        { status: 401 }
      );
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify`,
        {
          token,
        }
      );

      return NextResponse.json(response.data);
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Also add a GET method for server-side authentication checks
export async function GET() {
  try {
    const token = authCookies.getToken();

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify`,
        {
          token,
        }
      );

      return NextResponse.json({
        authenticated: true,
        user: response.data.user,
      });
    } catch (error) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
