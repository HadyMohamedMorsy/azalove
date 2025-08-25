import { API_ENDPOINTS_FROM_SERVER } from "@/config/api";
import { PAYMENT_METHOD_SELECT } from "@/config/constants";
import { apiFetch } from "@/utils/api-interceptor";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await apiFetch(API_ENDPOINTS_FROM_SERVER.PAYMENT_METHODS, {
    params: {
      query: {
        select: PAYMENT_METHOD_SELECT,
        where: {
          is_active: true,
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
          message: "Payment methods retrieved successfully",
        }
  );
}
