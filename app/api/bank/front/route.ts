import { API_ENDPOINTS_FROM_SERVER } from "@/config/api";
import { BANK_SELECT } from "@/config/constants";
import { apiFetch } from "@/utils/api-interceptor";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await apiFetch(API_ENDPOINTS_FROM_SERVER.BANKS, {
    params: {
      query: {
        select: BANK_SELECT,
        where: {
          is_active: true,
        },
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
      },
    },
  });

  return NextResponse.json(
    response.error
      ? { error: response.error }
      : {
          success: true,
          data: response.data.data,
          message: "Banks retrieved successfully",
        }
  );
}
