import { API_ENDPOINTS_FROM_SERVER } from "@/config/api";
import { BLOG_SELECT } from "@/config/constants";
import { apiFetch } from "@/utils/api-interceptor";
import { serverAuth } from "@/utils/server-auth";
import { NextResponse } from "next/server";

export async function GET() {
  // Check if user is authenticated on server-side
  const isAuthenticated = serverAuth.isAuthenticated();
  const currentUser = serverAuth.getCurrentUser();

  const response = await apiFetch(API_ENDPOINTS_FROM_SERVER.BLOGS, {
    params: {
      query: {
        select: BLOG_SELECT,
        isPagination: false,
        limit: 3,
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
          isFeatured: "true",
        },
      },
    },
  });

  // Add authentication info to response
  const responseData = response.error
    ? { error: response.error }
    : response.data.data;

  return NextResponse.json(
    {
      ...responseData,
      auth: {
        isAuthenticated,
        user: currentUser,
      },
    },
    { status: response.status }
  );
}
