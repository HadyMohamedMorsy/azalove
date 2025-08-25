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
    // Get user from cookies using server-side authentication
    const user = (await serverAuth.getCurrentUser()) as User | null;

    if (!user || !user.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const userId = user.id;

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

    return NextResponse.json(
      response.error
        ? { error: response.error }
        : {
            success: true,
            data: response.data.data,
            message: "Addresses retrieved successfully",
          }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch address data" },
      { status: 500 }
    );
  }
}
