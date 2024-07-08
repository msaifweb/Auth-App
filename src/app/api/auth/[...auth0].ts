// import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
// import Auth0Provider from "next-auth/providers/auth0";
// import { NextRequest, NextResponse } from "next/server";

// const authOptions: AuthOptions = {
//   providers: [
//     Auth0Provider({
//       clientId: process.env.AUTH0_CLIENT_ID!,
//       clientSecret: process.env.AUTH0_CLIENT_SECRET!,
//       issuer: `https://${process.env.AUTH0_ISSUER_BASE_URL}`,
//       authorization: { params: { scope: "openid email profile" } },
//     }),
//   ],
//   session: {
//     strategy: "jwt" as SessionStrategy, // Cast the string to the appropriate type
//   },
//   callbacks: {
//     async jwt({ token, account, profile }) {
//       console.log("jwt token", token);
//       if (account) {
//         token.accessToken = account.access_token;
//         token.idToken = account.id_token;
//       }
//       return token;
//     },
//     async session({ session, token }: any) {
//       session.accessToken = token.accessToken;
//       session.idToken = token.idToken;
//       return session;
//     },
//   },
// };

// export async function POST(req: NextRequest) {
//   const handler = NextAuth(authOptions);
//   return handler(req, new NextResponse());
// }

import { handleAuth } from "@auth0/nextjs-auth0";

export default handleAuth();
