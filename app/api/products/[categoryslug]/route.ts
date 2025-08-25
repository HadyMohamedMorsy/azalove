import { API_ENDPOINTS_FROM_SERVER } from "@/config/api";
import { PRODUCT_SELECT } from "@/config/constants";
import { apiFetch } from "@/utils/api-interceptor";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { categoryslug: string } }
) {
  const response = await apiFetch(API_ENDPOINTS_FROM_SERVER.PRODUCTS, {
    params: {
      query: {
        select: PRODUCT_SELECT,
        isPagination: true,
        page: 1,
        limit: 6,
        relations: {
          categories: {
            select: ["id", "name", "slug"],
            filters: {
              slug: params.categoryslug,
            },
          },
          sku: {
            select: ["id", "price", "quantity", "discount", "discountType"],
          },
        },
      },
    },
  });

  return NextResponse.json(
    response.error ? { error: response.error } : response.data.data
  );
}
