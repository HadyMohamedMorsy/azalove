import {
  API_ENDPOINTS_FROM_NEXT,
  API_ENDPOINTS_FROM_SERVER,
} from "@/config/api";
import { apiFetch } from "@/utils/api-interceptor";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [categoriesResponse, featuredBlogsResponse] = await Promise.all([
      apiFetch(API_ENDPOINTS_FROM_NEXT.MEGA_MENU_BLOG_CATEGORIES, {
        params: {
          query: {
            select: ["id", "name", "slug"],
            filters: {
              categoryType: "blog",
            },
            relations: {
              subCategories: {
                select: ["id", "name", "slug"],
                filters: {
                  categoryType: "blog",
                },
              },
            },
          },
        },
      }),
      apiFetch(API_ENDPOINTS_FROM_SERVER.BLOGS, {
        params: {
          query: {
            limit: 5,
            filters: {
              isFeatured: true,
            },
            select: ["id", "title", "thumb"],
            relations: {
              createdBy: {
                select: ["id", "firstName", "lastName"],
              },
            },
          },
        },
      }),
    ]);

    // Extract the actual data arrays from nested responses
    const categories = categoriesResponse?.data?.data || [];
    const featuredBlogs = featuredBlogsResponse?.data?.data?.data || [];

    return NextResponse.json({
      message: "blog filters retrieved successfully",
      statusCode: 200,
      data: {
        data: {
          categories,
          featuredBlogs,
        },
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching blog filters:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch blog filters data",
        statusCode: 500,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
