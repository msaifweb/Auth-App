import { initAuth0 } from "@auth0/nextjs-auth0";

export default initAuth0({
  clientID: process.env.AUTH0_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,
  issuerBaseURL: `https://${process.env.AUTH0_ISSUER_BASE_URL}`,
  baseURL: process.env.BASE_URL!,
  secret: process.env.AUTH0_SECRET!,
  authorizationParams: {
    scope: "openid profile email",
    redirect_uri: process.env.AUTH0_REDIRECT_URI!,
  },
  routes: {
    callback: process.env.AUTH0_REDIRECT_URI!,
    postLogoutRedirect: process.env.AUTH0_POST_LOGOUT_REDIRECT_URI!,
  },
  session: {
    rollingDuration: 60 * 60 * 8, // 8 hours in seconds
    rolling: true,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    },
  },
});
