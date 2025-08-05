import { apiFetch } from "@/utils/api-interceptor";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // Make API call to update user profile
    const response = await apiFetch(`/user/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    });

    if (response.error) {
      return NextResponse.json(
        { error: response.error },
        { status: response.status }
      );
    }

    return NextResponse.json({ data: response.data });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to update user profile",
      },
      { status: 500 }
    );
  }
}
