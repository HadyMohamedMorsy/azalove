import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate input
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Call the backend API to send forgot password email
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/forget-password`,
      {
        email,
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Forgot password error:", error);

    // Handle different types of errors
    if (error.response) {
      // Backend API error
      const status = error.response.status;
      const message =
        error.response.data?.message ||
        error.response.data?.error ||
        "An error occurred";

      return NextResponse.json({ error: message }, { status: status });
    } else if (error.request) {
      // Network error
      return NextResponse.json(
        { error: "Network error. Please check your connection and try again." },
        { status: 503 }
      );
    } else {
      // Other errors
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
}
