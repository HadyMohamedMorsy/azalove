import { API_ENDPOINTS_FROM_SERVER_DASHBOARD } from "@/config/api";
import { apiFetch } from "@/utils/api-interceptor";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userId = request.headers.get("user-id");
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");

    // Make API call to create address
    const response = await apiFetch(
      `${API_ENDPOINTS_FROM_SERVER_DASHBOARD.ADDRESS_CREATE}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'user-id': userId,
          Authorization: `Bearer ${token}`,
        },
        data: {
          ...body,
          isDefault: body.isDefault || false,
        },
      }
    );

    if (response.error) {
      return NextResponse.json(
        { error: response.error },
        { status: response.status }
      );
    }

    return NextResponse.json({ data: response.data });
  } catch (error) {
    console.error("Error creating address:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create address",
      },
      { status: 500 }
    );
  }
}
