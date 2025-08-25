import { apiFetch } from "@/utils/api-interceptor";
import { serverAuth } from "@/utils/server-auth";
import { NextRequest, NextResponse } from "next/server";

// Define User interface for server-side usage
interface User {
  id: string;
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  birthOfDate?: string;
  type?: string;
  role?: string;
  phoneNumber?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function GET(request: NextRequest) {
  try {
    // Get the authorization header from the request
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "Authorization header is required" },
        { status: 401 }
      );
    }

    // Get current user from server auth
    const currentUser = (await serverAuth.getCurrentUser()) as User | null;

    if (!currentUser || !currentUser.id) {
      return NextResponse.json(
        { error: "User not found or invalid" },
        { status: 401 }
      );
    }

    // Get pagination parameters from query string
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const response = await apiFetch(`/order/front`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      params: {
        query: {
          page,
          limit,
          isPagination: "true",

          relations: {
            createdBy: {
              filters: {
                createdBy: currentUser.id,
              },
              select: ["id", "firstName", "lastName", "email"],
            },
          },
          sort: {
            field: "createdAt",
            order: "DESC",
          },
        },
      },
    });

    if (response.error) {
      return NextResponse.json(
        { error: response.error },
        { status: response.status }
      );
    }

    return NextResponse.json({
      data: response.data.data,
      recordsFiltered: response.data.recordsFiltered,
      totalRecords: response.data.totalRecords,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch user orders",
      },
      { status: 500 }
    );
  }
}
