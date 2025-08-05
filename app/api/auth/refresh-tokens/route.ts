import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token is required" },
        { status: 400 }
      );
    }

    // Make request to your backend API to refresh tokens
    const response = await fetch(
      `${process.env.API_BASE_URL}/auth/refresh-tokens`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to refresh tokens" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      data: {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        user: data.user,
      },
    });
  } catch (error) {
    console.error("Error refreshing tokens:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
