import { NextApiRequest, NextApiResponse } from "next";
import { handleCallback } from "@auth0/nextjs-auth0";

export default async function callback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Call the default callback handler
    await handleCallback(req, res, {
      afterCallback: async (req, res, session, state) => {
        // Custom logic after successful authentication
        // For example, you can log the session or add custom claims
        console.log("User session:", session);

        // Return the session
        return session;
      },
      redirectUri: "/profile", // Redirect to the profile page after successful authentication
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
