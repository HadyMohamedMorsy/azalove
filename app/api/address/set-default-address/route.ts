import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { addressId } = body;
    const userId = request.headers.get("user-id");

    // Validate required fields
    if (!addressId) {
      return NextResponse.json(
        { error: "addressId is required" },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: "user-id header is required" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "Address set as default successfully",
      data: {
        addressId: parseInt(addressId),
        userId: parseInt(userId),
        isDefault: true,
      },
    });
  } catch (error) {
    console.error("Error setting default address:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
