import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
  try {
    // const body = await req.json();
    const { email, password }: any = req.body;

    // console.log(body);

    const response = await fetch(
      "https://dev-q53dzuk0m4ze6hvy.us.auth0.com/oauth/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.AUTH0_CLIENT_ID,
          client_secret: process.env.AUTH0_CLIENT_SECRET,
          audience: process.env.AUTH0_AUDIENCE,
          grant_type: process.env.AUTH0_GRANT_TYPE,
          username: email,
          password: password,
          realm: process.env.AUTH0_REALM,
          // scope: "openid profile email",
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
    console.log(data);
    console.log("id token", data.id_Token);
    if (data.id_token) {
      console.log("ID Token:", data.id_token);
    }

    if (data.access_token) {
      const cookie = serialize("accessToken", data.access_token, {
        maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      const res = new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          "Set-Cookie": cookie,
        },
      });

      return res;
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching access token or API data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
