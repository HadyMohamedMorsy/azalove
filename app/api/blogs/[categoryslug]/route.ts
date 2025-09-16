import { API_ENDPOINTS_FROM_SERVER } from "@/config/api";
import { BLOG_SELECT } from "@/config/constants";
import { apiFetch } from "@/utils/api-interceptor";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ categoryslug: string }> }
) {
  const { categoryslug } = await params;
  
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
            filters: {
              slug: categoryslug,
            },
          },
          createdBy: {
            select: ["id", "firstName", "lastName"],
          },
        },
        filters: {
          isPublished: "true",
        },
      },
    },
  });

  return NextResponse.json(
    response.error ? { error: response.error } : response.data.data
  );
}
