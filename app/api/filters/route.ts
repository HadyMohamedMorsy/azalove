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
          },
        },
      }),
      apiFetch(API_ENDPOINTS_FROM_SERVER.PRODUCTS, {
        params: {
          query: {
            limit: 2,
            filters: {
              isFeatured: true,
            },
            relations: {
              sku: {
                select: ["id", "price"],
              },
            },
          },
        },
      }),
    ]);

    const data = {
      categories: categoriesResponse.data || [],
      featuredProducts: featuredProductsResponse.data || [],
    };

    return NextResponse.json({ data: { data } });
  } catch (error) {
    console.error("Error fetching filters:", error);
    return NextResponse.json(
      { error: "Failed to fetch filters data" },
      { status: 500 }
    );
  }
}
