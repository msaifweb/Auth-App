// pages/api/user/profile.ts
import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";

export async function GET(req: NextRequest) {
  try {
    const cookies = req.headers.get("cookie");
    const { accessToken } = parse(cookies || "");

    if (!accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userProfileResponse = await fetch(
      "https://dev-q53dzuk0m4ze6hvy.us.auth0.com/userinfo",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!userProfileResponse.ok) {
      const errorText = await userProfileResponse.text();
      console.error(
        `Error fetching user profile: ${userProfileResponse.status} - ${errorText}`
      );
      return NextResponse.json(
        {
          error: `Failed to fetch user profile: ${userProfileResponse.status} - ${errorText}`,
        },
        { status: userProfileResponse.status }
      );
    }

    const userProfile = await userProfileResponse.json();
    return NextResponse.json({ userProfile });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
