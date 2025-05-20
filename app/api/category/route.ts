import { apiFetch } from "@/utils/api-interceptor";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await apiFetch("/category/front", {
    params: {
      query: {
        select: ["id", "name", "slug", "icon"],
        isPagination: false,
      },
    },
  });

  return NextResponse.json(
    response.error ? { error: response.error } : response.data,
    { status: response.status }
  );
}
