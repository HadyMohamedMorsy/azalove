import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/blog/by-slug/${params.slug}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      console.error(
        "API Response not OK:",
        response.status,
        response.statusText
      );
      throw new Error(
        `Failed to fetch blog data: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch blog data",
      },
      { status: 500 }
    );
  }
}
