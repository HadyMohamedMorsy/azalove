import { apiFetch } from "@/utils/api-interceptor";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  try {
    console.log("Making API call to /address/front with userId:", userId);
    const response = await apiFetch(`/address/front`, {
      params: {
        userId,
        query: {
          select: [
            "id",
            "title",
            "addressLine1",
            "addressLine2",
            "postalCode",
            "landmark",
            "phoneNumber",
            "isDefault",
          ],
          relations: {
            country: {
              select: ["id", "name"],
            },
            region: {
              select: ["id", "name"],
            },
            city: {
              select: ["id", "name"],
            },
            area: {
              select: ["id", "name"],
            },
            user: {
              select: ["id", "firstName", "lastName"],
              filters: {
                id: userId,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch address data" },
      { status: 500 }
    );
  }
}
