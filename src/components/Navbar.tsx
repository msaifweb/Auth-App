"use client";
import React, { useEffect, useState } from "react"; // Added React import
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import LogoutButton from "./LogoutButton"; // Adjust the path according to your project structure

import { getCookie } from "../lib/useAuth";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const checkAuthStatus = () => {
    const token = getCookie("accessToken");
    console.log("Token fetch:", token); // Add logging to debug
    setIsAuthenticated(!!token);
  };

  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenFromCookie: any = Cookies.get("accessToken");
    console.log("Token from cookie:", tokenFromCookie); // Add logging

    setToken(tokenFromCookie);
  }, []);

  useEffect(() => {
    checkAuthStatus();

    const handleLoginEvent = () => {
      checkAuthStatus();
    };

    window.addEventListener("login", handleLoginEvent);

    return () => {
      window.removeEventListener("login", handleLoginEvent);
    };
  }, []);

  const handleLogout = () => {
    document.cookie = "accessToken=; Max-Age=0; path=/;"; // Remove cookie
    setIsAuthenticated(false);
    router.push("/signin");
  };

  return (
    <nav className="flex md:flex-row flex-col items-center justify-between border-b px-32 py-4">
      <section>
        <h1
          onClick={() => router.push("/")}
          className="text-3xl font-semibold cursor-pointer"
        >
          Auth0
        </h1>
      </section>
      <section className="flex items-center gap-4">
        {!isAuthenticated && (
          <>
            <button
              onClick={() => router.push("/signin")}
              className="rounded-md bg-indigo-600 px-3 py-1.5 text-lg font-normal leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign In
            </button>
            <button
              onClick={() => router.push("/signup")}
              className="rounded-md bg-indigo-600 px-3 py-1.5 text-lg font-normal leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
          </>
        )}
        {isAuthenticated && <LogoutButton />}
      </section>
    </nav>
  );
};

export default Navbar;
