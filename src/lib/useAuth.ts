"use client";
// lib/useAuth.ts
import { useEffect, useState } from "react";
import { getCookie } from "@/lib/getCookie";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = getCookie("accessToken");
    console.log("Token retrieved from cookie:", token);
    setIsAuthenticated(!!token);
  }, []);

  return { isAuthenticated };
}
