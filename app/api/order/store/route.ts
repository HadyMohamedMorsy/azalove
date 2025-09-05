import { API_BASE_URL } from "@/config/api";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body.products?.length || !body.payment_id) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get token from cookies
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

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    // Prepare headers
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Add user-id header if available
    if (userId) {
      headers["user-id"] = userId;
    }

    // Forward to backend
    const response = await fetch(`${API_BASE_URL}/order/store`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
