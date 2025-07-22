import { API_ENDPOINTS_FROM_SERVER } from "@/config/api";
import { PRODUCT_SELECT, SKU_SELECT } from "@/config/constants";
import { apiFetch } from "@/utils/api-interceptor";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { categorySlug, minPrice, maxPrice, length = 10, start = 0 } = body;

    // Build the query parameters
    const queryParams: any = {
      select: PRODUCT_SELECT,
      isPagination: true,
      page: Math.floor(start / length) + 1,
      limit: length,
      relations: {
        sku: {
          select: SKU_SELECT,
        },
        categories: {
          select: ["id", "name", "slug"],
        },
      },
    };

    // Add category filter if provided
    if (categorySlug) {
      queryParams.relations.categories.filters = {
        slug: categorySlug,
      };
    }

    // Add price range filter if provided
    if (minPrice || maxPrice) {
      if (minPrice) {
        queryParams.relations.sku.filters = {
          ...queryParams.relations.sku.filters,
          minPrice: minPrice,
        };
      }
      if (maxPrice) {
        queryParams.relations.sku.filters = {
          ...queryParams.relations.sku.filters,
          maxPrice: maxPrice,
        };
      }
    }

    const response = await apiFetch(API_ENDPOINTS_FROM_SERVER.PRODUCTS, {
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
    console.error("Error filtering products:", error);
    return NextResponse.json(
      { error: "Failed to filter products" },
      { status: 500 }
    );
  }
}
