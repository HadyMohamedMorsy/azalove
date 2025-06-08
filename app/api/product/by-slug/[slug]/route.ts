import { apiFetch } from "@/utils/api-interceptor";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  if (!params?.slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/by-slug/${params.slug}`,
      {
        params: {
          query: {
            relations: {
              categories: {
                select: ["id", "name", "slug"],
              },
              sku: {
                select: ["id", "price", "quantity", "discount", "discountType"],
              },
            },
          },
        },
      }
    );

    if (!response.data) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ data: response.data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product data" },
      { status: 500 }
    );
  }
}
