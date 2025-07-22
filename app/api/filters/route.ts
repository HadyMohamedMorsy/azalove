import { API_ENDPOINTS_FROM_SERVER } from "@/config/api";
import { apiFetch } from "@/utils/api-interceptor";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [categoriesResponse, featuredProductsResponse] = await Promise.all([
      apiFetch(API_ENDPOINTS_FROM_SERVER.CATEGORIES, {
        params: {
          query: {
            select: ["id", "name", "slug"],
            filters: {
              categoryType: "product",
            },
            relations: {
              subCategories: {
                select: ["id", "name", "slug"],
                filters: {
                  categoryType: "product",
                },
              },
            },
          },
        },
      }),
      apiFetch(API_ENDPOINTS_FROM_SERVER.PRODUCTS, {
        params: {
          query: {
            limit: 5,
            filters: {
              isFeatured: true,
            },
            select: ["id", "title", "thumb"],
            relations: {
              sku: {
                select: ["id", "price"],
              },
            },
          },
        },
      }),
    ]);

    // Extract the actual data arrays from nested responses
    const categories = categoriesResponse?.data?.data || [];
    const featuredProducts = featuredProductsResponse?.data?.data || [];

    return NextResponse.json({
      message: "filters retrieved successfully",
      statusCode: 200,
      data: {
        data: {
          categories,
          featuredProducts,
        },
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching filters:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch filters data",
        statusCode: 500,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
