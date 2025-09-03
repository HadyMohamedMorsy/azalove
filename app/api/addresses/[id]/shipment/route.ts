import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: addressId } = await params;

    // Validate address ID
    if (!addressId || isNaN(parseInt(addressId))) {
      return NextResponse.json(
        { error: "Valid address ID is required" },
        { status: 400 }
      );
    }

    // Get auth token and user data directly from cookies using next/headers
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    const userDataCookie = cookieStore.get("user_data")?.value;

    let userData;
    try {
      userData = userDataCookie
        ? JSON.parse(decodeURIComponent(userDataCookie))
        : null;
    } catch (e) {
      console.error("Error parsing user data:", e);
      userData = null;
    }

    if (!token) {
      return NextResponse.json(
        { error: "Authentication token required" },
        { status: 401 }
      );
    }

    if (!userData || !userData.id) {
      return NextResponse.json(
        { error: "User data required" },
        { status: 401 }
      );
    }

    const userId = userData.id;

    // Make direct request to your backend server with token from cookie
    const backendUrl = `${process.env.BACKEND_URL || "http://localhost:3001/api/v1"}/address/${addressId}/shipment`;

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "user-id": userId,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Backend request failed: ${response.status} ${response.statusText}`
      );
    }

    const backendData = await response.json();

    return NextResponse.json({ data: backendData.data });
  } catch (error) {
    console.error("Error fetching shipment information:", error);
    return NextResponse.json(
      { error: "Failed to fetch shipment information from backend" },
      { status: 500 }
    );
  }
}
