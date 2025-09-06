import { API_BASE_URL, API_ENDPOINTS_FROM_SERVER } from "@/config/api";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Get auth token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get the request body
    const body = await request.json();
    const { answers, characterSelection } = body;

    // Prepare headers for backend request
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Prepare the data to send to backend
    const requestData = {
      answers,
      characterSelection,
    };

    // Make request to backend with authentication
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS_FROM_SERVER.BOOKE_PAGES}`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(requestData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Failed to find books" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Books finder API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
