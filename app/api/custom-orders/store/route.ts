import { API_BASE_URL } from "@/config/api";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get auth token from cookies
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
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get FormData from request
    const formData = await request.formData();

    // Prepare headers for backend request
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };

    if (userId) {
      headers["user-id"] = userId;
    }

    // Make request to backend with FormData
    const response = await fetch(`${API_BASE_URL}/custom-orders/store`, {
      method: "POST",
      headers,
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Failed to create custom order" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
