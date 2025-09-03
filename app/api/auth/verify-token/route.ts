import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = body.token;
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/validate-reset-token`,
        {
          token,
        }
      );
      return NextResponse.json({
        status: "success",
        data: response.data.data,
      });
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
