// // pages/api/auth/me.js

// import { getSession } from "@auth0/nextjs-auth0";

// export default async function handler(req, res) {
//   try {
//     const { user } = await getSession(req, res);

//     if (!user) {
//       return res.status(401).json({ error: "User not authenticated" });
//     }

//     res.status(200).json({ user });
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  const { cookies } = req;
  const accessToken = cookies.accessToken;
  console.log(accessToken);

  if (!accessToken) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const response = await fetch(
      "https://dev-q53dzuk0m4ze6hvy.us.auth0.com/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user information");
    }

    const user = await response.json();
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
