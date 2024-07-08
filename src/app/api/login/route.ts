import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // Parse the JSON body from the request
    const body = await req.json();
    const { email, password } = body; // Correctly extracting email and password from the parsed body

    const response = await fetch(
      `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.AUTH0_CLIENT_ID,
          client_secret: process.env.AUTH0_CLIENT_SECRET,
          audience: "https://auth-app",
          grant_type: "password",
          username: email, // Ensure this matches what Auth0 expects
          password: password,
          scope: "openid profile email",
        }),
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

    // Output for debugging
    console.log("API response data:", data);
    if (data.id_token) {
      console.log("ID Token:", data.id_token);
    }

    if (data.id_token) {
      const cookie = serialize("accessToken", data.id_token, {
        maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
        path: "/",
        // httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          "Set-Cookie": cookie,
        },
      });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error processing the request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
