import { API_BASE_URL, API_ENDPOINTS_FROM_SERVER } from "@/config/api";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Get auth token and user data from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    const userDataCookie = cookieStore.get("user_data")?.value;

    let userId: string | undefined;
    try {
      const userData = userDataCookie
        ? JSON.parse(decodeURIComponent(userDataCookie))
        : null;
      userId = userData?.id;
    } catch (e) {
      console.error("Error parsing user data:", e);
    }

    // Prepare headers for backend request
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Add authentication headers if token is available
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    if (userId) {
      headers["user-id"] = userId;
    }

    // Forward the request to the backend
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS_FROM_SERVER.COUPON_VALIDATE}`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Failed to validate coupon" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Coupon validation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
