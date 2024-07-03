import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(request: NextRequest) {
  try {
    const cookieSerialized = serialize("accessToken", "", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      expires: new Date(0),
    });

    const response = new NextResponse(
      JSON.stringify({ message: "Logout successful" }),
      {
        status: 200,
        headers: {
          "Set-Cookie": cookieSerialized,
        },
      }
    );
    return response;
  } catch (error: any) {
    console.error("Error processing login request:", error);
    return new NextResponse(
      JSON.stringify({
        error:
          error.message || "An error occurred while processing the request",
      }),
      { status: error.status || 500 }
    );
  }
}
