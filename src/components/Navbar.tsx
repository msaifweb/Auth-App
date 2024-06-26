"use client";
import { useRouter } from "next/navigation";
import React from "react";
const Navbar = () => {
  const router = useRouter();
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
      </section>
    </nav>
  );
};

export default Navbar;
