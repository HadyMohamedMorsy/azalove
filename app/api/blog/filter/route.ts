import { API_ENDPOINTS_FROM_SERVER } from "@/config/api";
import { BLOG_SELECT } from "@/config/constants";
import { apiFetch } from "@/utils/api-interceptor";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { categorySlug, length = 10, start = 0 } = body;

    // Build the query parameters
    const queryParams: any = {
      select: BLOG_SELECT,
      isPagination: true,
      page: start,
      limit: length,
      relations: {
        categories: {
          select: ["id", "name", "slug"],
        },
        createdBy: {
          select: ["id", "firstName", "lastName"],
        },
      },
      filters: {
        isPublished: "true",
      },
    };

    // Add category filter if provided
    if (categorySlug) {
      queryParams.relations.categories.filters = {
        slug: categorySlug,
      };
    }

    const response = await apiFetch(API_ENDPOINTS_FROM_SERVER.BLOGS, {
      params: {
        query: queryParams,
      },
    });

    if (response.error) {
      return NextResponse.json({ error: response.error }, { status: 400 });
    }

    const data = response.data?.data || [];
    const totalRecords = response.data?.totalRecords || 0;

    return NextResponse.json({
      data,
      recordsFiltered: data.length,
      totalRecords: +totalRecords,
    });
  } catch (error) {
    console.error("Error filtering blogs:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to filter blogs",
      },
      { status: 500 }
    );
  }
}
