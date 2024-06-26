import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const tokenResponse = await fetch(
      `https://dev-q53dzuk0m4ze6hvy.us.auth0.com/oauth/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: "m4kc3OhyVh35XEKXD9DTHeQ8e6ikAIBf",
          client_secret:
            "RgiFO5KriIl5gp1ib6IgrMtH1ylzDqC8A2QgQYlrcz6AAoac1jJ90cRc3ltJm7Y3",
          audience: "https://dev-q53dzuk0m4ze6hvy.us.auth0.com/api/v2/",
          grant_type: "client_credentials",
          scope: "read:users",
        }),
      }
    );

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error(
        `Error fetching access token: ${tokenResponse.status} - ${errorText}`
      );
    }

    const tokenData = await tokenResponse.json();
    console.log("Token Data:", tokenData);
    const accessToken = tokenData.access_token;
    console.log("Access Token:", accessToken);

    if (!accessToken) {
    }

    const response = await fetch(
      "https://dev-q53dzuk0m4ze6hvy.us.auth0.com/api/v2/users",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
