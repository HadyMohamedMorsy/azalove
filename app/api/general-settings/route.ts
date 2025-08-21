import { API_ENDPOINTS_FROM_SERVER } from "@/config/api";
import { apiFetch } from "@/utils/api-interceptor";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = await apiFetch(
      API_ENDPOINTS_FROM_SERVER.GENERAL_SETTINGS,
      {
        method: "POST",
      }
    );

    if (response.error) {
      return NextResponse.json(
        { success: false, message: response.error },
        { status: response.status }
      );
    }
    console.log(response.data.data);
    return NextResponse.json({
      success: true,
      data: response.data.data.data[0],
    });
  } catch (error) {
    console.error("Error in general-settings API route:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
