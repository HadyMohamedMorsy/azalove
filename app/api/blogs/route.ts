import { API_ENDPOINTS_FROM_SERVER } from "@/config/api";
import { BLOG_SELECT } from "@/config/constants";
import { apiFetch } from "@/utils/api-interceptor";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await apiFetch(API_ENDPOINTS_FROM_SERVER.BLOGS, {
    params: {
      query: {
        select: BLOG_SELECT,
        isPagination: false,
        limit: 3,
        filters: {
          isPublished: "true",
          isFeatured: "true",
        },
      },
    },
  });

  return NextResponse.json(
    response.error ? { error: response.error } : response.data,
    { status: response.status }
  );
}
