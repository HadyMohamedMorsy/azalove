import { API_ENDPOINTS_FROM_SERVER } from "@/config/api";
import { apiFetch } from "@/utils/api-interceptor";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await apiFetch(API_ENDPOINTS_FROM_SERVER.BANKS, {
      params: {
        query: {
          select: [
            "id",
            "accountName",
            "accountNumber",
            "featuredImage",
            "branchName",
            "bankName",
            "iban",
            "swiftCode",
            "isActive",
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
          },
          filters: {
            isActive: true,
          },
        },
      },
    });

    return NextResponse.json(
      response.error ? { error: response.error } : response.data.data,
      { status: response.status }
    );
  } catch (error) {
    console.error("Error fetching bank accounts:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch bank accounts",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
