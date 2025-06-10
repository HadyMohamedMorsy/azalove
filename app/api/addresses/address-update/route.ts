import { API_ENDPOINTS_FROM_SERVER_DASHBOARD } from "@/config/api";
import { apiFetch } from "@/utils/api-interceptor";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = { ...(await request.json()), id };

    if (!id) {
      return NextResponse.json(
        { error: "Address ID is required" },
        { status: 400 }
      );
    }

    const response = await apiFetch(
      `${API_ENDPOINTS_FROM_SERVER_DASHBOARD.ADDRESS_UPDATE}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data: body,
      }
    );

    if (!response.data) {
      return NextResponse.json(
        { error: "Failed to update address" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: response.data });
  } catch (error) {
    console.error("Error updating address:", error);
    return NextResponse.json(
      { error: "Failed to update address" },
      { status: 500 }
    );
  }
}
