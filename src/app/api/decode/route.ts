import jwt, { JwtHeader, SigningKeyCallback } from "jsonwebtoken";
const secretKey = process.env.SECRET_KEY;
import { NextRequest, NextResponse } from "next/server";

import jwksClient from "jwks-rsa";

if (!process.env.AUTH0_DOMAIN) {
  throw new Error("Missing AUTH0_DOMAIN environment variable");
}

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

function getKey(header: JwtHeader, callback: SigningKeyCallback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key?.getPublicKey();
    callback(err, signingKey);
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
    const body = await req.json();
    console.log("body token", body);
    const { token } = body;

    const decoded = await verifyToken(token);
    const { email } = decoded;

    const response = {
      decoded,
      email,
    };

    return NextResponse.json({ response }, { status: 200 });
    // const { sub: userId, email }: any = decodedToken;
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
