import { NextApiRequest, NextApiResponse } from "next";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { email } = req.body;

  try {
    // Construct the /authorize URL
    const authorizeUrl =
      `https://${process.env.AUTH0_DOMAIN}/authorize?` +
      `client_id=${process.env.AUTH0_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(
        process.env.AUTH0_REDIRECT_URI as string
      )}` +
      `&response_type=code` +
      `&scope=openid profile email` +
      `&login_hint=${email}`;

    // Redirect the user to the Auth0 login page
    res.redirect(authorizeUrl);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
