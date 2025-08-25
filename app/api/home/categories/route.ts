import { API_ENDPOINTS_FROM_SERVER } from "@/config/api";
import { CATEGORY_SELECT } from "@/config/constants";
import { apiFetch } from "@/utils/api-interceptor";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await apiFetch(API_ENDPOINTS_FROM_SERVER.CATEGORIES, {
    params: {
      query: {
        select: CATEGORY_SELECT,
        isPagination: false,
        limit: 5,
        filters: {
          categoryType: "product",
        },
      },
    },
  });
  return NextResponse.json(
    response.error ? { error: response.error } : response.data.data,
    { status: response.status }
  );
}
