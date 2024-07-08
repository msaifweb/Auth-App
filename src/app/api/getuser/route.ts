import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
<<<<<<< Updated upstream
    const tokenResponse = await fetch(
      `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.AUTH0_CLIENT_ID,
          client_secret: process.env.AUTH0_CLIENT_SECRET,
          audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
          grant_type: "client_credentials",
          scope: "read:users",
        }),
      }
    );
=======
    const token =
      req.headers.get("Authorization")?.split(" ")[1] ||
      req.cookies.get("accessToken");
>>>>>>> Stashed changes

    if (!token) {
      return NextResponse.json(
        { error: "Access token is missing" },
        { status: 401 }
      );
    }

    const response = await fetch(
<<<<<<< Updated upstream
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users`,
=======
      "https://dev-q53dzuk0m4ze6hvy.us.auth0.com/userinfo",
>>>>>>> Stashed changes
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
          error: `Failed to fetch data from API: ${response.status} - ${errorText}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching access token or API data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
