import { cookieKeys } from "@/utils/cookies";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const {
      firstName,
      lastName,
      email,
      username,
      phoneNumber,
      birthOfDate,
      password,
    } = await request.json();

    // Validate input
    if (
      !firstName ||
      !lastName ||
      !email ||
      !username ||
      !phoneNumber ||
      !birthOfDate ||
      !password
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        firstName,
        lastName,
        email,
        username,
        phoneNumber,
        birthOfDate,
        password,
      }
    );

    // If registration is successful, store user data and tokens in cookies
    if (response.data.data.access_token && response.data.data.user) {
      const { access_token, refreshToken } = response.data.data;

      // Get the cookie store
      const cookieStore = await cookies();

      // Set auth token cookie
      cookieStore.set(cookieKeys.AUTH_TOKEN, access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: "/",
      });

      // Set refresh token cookie
      cookieStore.set(cookieKeys.REFRESH_TOKEN, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
      });

      // Set user data cookie
      cookieStore.set(
        cookieKeys.USER_DATA,
        JSON.stringify(response.data.data.user),
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60, // 7 days
          path: "/",
        }
      );
    }

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
