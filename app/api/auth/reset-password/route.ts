import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, newPassword } = body;

    if (!token || !newPassword) {
      return NextResponse.json(
        {
          status: "error",
          message: "Token and new password are required",
        },
        { status: 400 }
      );
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        {
          token,
          newPassword,
        }
      );
      return NextResponse.json({
        status: "success",
        data: response.data.data,
      });
    } catch (error: any) {
      console.error(
        "Reset password API error:",
        error.response?.data || error.message
      );
      return NextResponse.json(
        {
          status: "error",
          message: error.response?.data?.message || "Failed to reset password",
        },
        { status: error.response?.status || 500 }
      );
    }
  } catch (error) {
    console.error("Reset password endpoint error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
