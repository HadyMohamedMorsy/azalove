import { API_ENDPOINTS_FROM_SERVER } from "@/config/api";
import { BLOG_SELECT } from "@/config/constants";
import { apiFetch } from "@/utils/api-interceptor";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await apiFetch(API_ENDPOINTS_FROM_SERVER.BLOGS, {
    params: {
      query: {
        select: BLOG_SELECT,
        isPagination: true,
        page: 1,
        limit: 6,
        relations: {
          categories: {
            select: ["id", "name", "slug"],
          },
          createdBy: {
            select: ["id", "firstName", "lastName"],
          },
        },
      },
    },
  });

  return NextResponse.json(
    response.error ? { error: response.error } : response.data.data
  );
}
