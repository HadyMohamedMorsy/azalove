import { API_ENDPOINTS_FROM_SERVER_DASHBOARD } from "@/config/api";
import { apiFetch } from "@/utils/api-interceptor";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Address ID is required" },
        { status: 400 }
      );
    }

    // Make API call to delete address
    const response = await apiFetch(
      `${API_ENDPOINTS_FROM_SERVER_DASHBOARD.ADDRESS_DELETE}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        data: { id },
      }
    );

    if (!response.data) {
      return NextResponse.json(
        { error: "Failed to delete address" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: response.data });
  } catch (error) {
    console.error("Error deleting address:", error);
    return NextResponse.json(
      { error: "Failed to delete address" },
      { status: 500 }
    );
  }
}
