import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Extract the token from the request headers or cookies
    const token =
      req.headers.get("Authorization")?.split(" ")[1] ||
      req.cookies.get("accessToken");

    if (!token) {
      return NextResponse.json(
        { error: "Access token is missing" },
        { status: 401 }
      );
    }

    // Fetch the user data using the existing access token
    const response = await fetch(
      "https://dev-q53dzuk0m4ze6hvy.us.auth0.com/api/v2/users/auth0|668632dedae21d7f95bd20c8",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error from Auth0 API: ${response.status} - ${errorText}`);
      return NextResponse.json(
        {
          error: `Failed to fetch user data from API: ${response.status} - ${errorText}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
