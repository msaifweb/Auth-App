// lib/useToken.tsx

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { parseCookies, setCookie, destroyCookie } from "nookies";

const TOKEN_NAME = "accessToken";

export const useToken = () => {
  const router = useRouter();

  // Get token from cookies
  const getToken = () => {
    const cookies = parseCookies();
    console.log("Parsed Cookies:", cookies);
    return cookies[TOKEN_NAME];
  };

  // Set token in cookies
  const setToken = (token: string) => {
    setCookie(null, TOKEN_NAME, token, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/", // accessible from all paths
      sameSite: "lax", // lax cross-site cookie handling
      secure: process.env.NODE_ENV === "production", // secure cookie in production
    });
  };

  // Remove token from cookies
  const removeToken = () => {
    destroyCookie(null, TOKEN_NAME);
  };

  return { getToken, setToken, removeToken };
};
