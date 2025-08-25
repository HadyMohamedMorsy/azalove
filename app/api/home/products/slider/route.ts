import { API_ENDPOINTS_FROM_SERVER } from "@/config/api";
import { PRODUCT_SELECT, SKU_SELECT } from "@/config/constants";
import { apiFetch } from "@/utils/api-interceptor";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await apiFetch(API_ENDPOINTS_FROM_SERVER.PRODUCTS, {
    params: {
      query: {
        select: PRODUCT_SELECT,
        limit: 5,
        relations: {
          sku: {
            select: SKU_SELECT,
            filters: {
              isNew: true,
              isFeatured: true,
              isBestSeller: true,
            },
          },
          categories: {
            select: ["id", "name", "slug"],
          },
        },
      },
    },
  });

  return NextResponse.json(
    response.error ? { error: response.error } : response.data.data
  );
}
