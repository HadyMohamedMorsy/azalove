import { cookieKeys } from "@/utils/cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Get the cookie store
    const cookieStore = await cookies();

    // Clear all auth-related cookies
    cookieStore.delete(cookieKeys.AUTH_TOKEN);
    cookieStore.delete(cookieKeys.REFRESH_TOKEN);
    cookieStore.delete(cookieKeys.USER_DATA);

    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
