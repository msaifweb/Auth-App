// import jwt, { JwtHeader, SigningKeyCallback } from "jsonwebtoken";
// import { NextRequest, NextResponse } from "next/server";
// import jwksClient from "jwks-rsa";

// if (!process.env.AUTH0_DOMAIN) {
//   throw new Error("Missing AUTH0_DOMAIN environment variable");
// }

// const client = jwksClient({
//   jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
// });

// function getKey(header: JwtHeader, callback: SigningKeyCallback) {
//   client.getSigningKey(header.kid, function (err, key) {
//     if (err) {
//       return callback(err);
//     }
//     const signingKey = key?.getPublicKey();
//     callback(null, signingKey);
//   });
// }

// async function verifyToken(token: string): Promise<any> {
//   return new Promise((resolve, reject) => {
//     jwt.verify(token, getKey, { algorithms: ["RS256"] }, (err, decoded) => {
//       if (err) {
//         return reject(err);
//       }
//       resolve(decoded);
//     });
//   });
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { token } = body;

//     const decoded = await verifyToken(token);
//     console.log("Decoded token:", decoded);

//     // Validate and extract userId from sub claim
//     const { sub } = decoded;
//     if (!sub || typeof sub !== "string") {
//       throw new Error("Missing or invalid sub claim");
//     }

//     const subParts = sub.split("|");
//     if (subParts.length !== 2 || subParts[0] !== "auth0") {
//       throw new Error("Unexpected sub claim format");
//     }

//     const userId = subParts[1]; // Extract userId from sub claim
//     console.log("Decoded userId:", userId);

//     return NextResponse.json({ decoded, userId }, { status: 200 });
//   } catch (error: any) {
//     console.error("Error processing request:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import jwt, { JwtHeader, SigningKeyCallback } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import jwksClient from "jwks-rsa";
import { parse } from "cookie";

if (!process.env.AUTH0_DOMAIN) {
  throw new Error("Missing AUTH0_DOMAIN environment variable");
}

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

function getKey(header: JwtHeader, callback: SigningKeyCallback) {
  client.getSigningKey(header.kid, function (err, key) {
    if (err) {
      return callback(err);
    }
    const signingKey = key?.getPublicKey();
    callback(null, signingKey);
  });
}

async function verifyToken(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, getKey, { algorithms: ["RS256"] }, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
}

export async function POST(req: NextRequest) {
  try {
    const cookies = parse(req.headers.get("cookie") || "");
    const token = cookies.accessToken;

    if (!token) {
      throw new Error("Token must be provided");
    }

    const decoded = await verifyToken(token);
    console.log("Decoded token:", decoded);

    // Extract the email from the decoded token
    const email = decoded.email;
    if (!email || typeof email !== "string") {
      throw new Error("Missing or invalid email claim");
    }

    return NextResponse.json({ email }, { status: 200 });
  } catch (error: any) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
