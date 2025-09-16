import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { shapeId, partType } = body;

    // Validate required fields
    if (!shapeId || !partType) {
      return NextResponse.json(
        { error: "shapeId and partType are required" },
        { status: 400 }
      );
    }

    // Get API base URL from environment or use default
    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api/v1";

    // Get token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    // Prepare headers
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Add authorization header if token exists
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // Make API call to the actual endpoint
    const response = await fetch(`${apiBaseUrl}/shapes/parts`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        shapeId,
        partType,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `API call failed with status: ${response.status}`,
        errorText
      );

      // Handle specific error cases
      if (response.status === 401) {
        return NextResponse.json(
          { error: "Unauthorized - Invalid or missing token" },
          { status: 401 }
        );
      }

      throw new Error(`API call failed with status: ${response.status}`);
    }

    const partsData = await response.json();
    // Return the data as is from the API
    return NextResponse.json(partsData.data);
  } catch (error) {
    console.error("Error in shapes/parts API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
