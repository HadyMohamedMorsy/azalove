import { API_ENDPOINTS_FROM_SERVER } from "@/config/api";
import { apiFetch } from "@/utils/api-interceptor";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await apiFetch(API_ENDPOINTS_FROM_SERVER.QUIZ_QUESTIONS);

  return NextResponse.json(
    response.error ? { error: response.error } : response.data,
    { status: response.status }
  );
}
