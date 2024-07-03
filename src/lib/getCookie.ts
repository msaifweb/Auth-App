"use client";
// lib/getCookie.ts
export function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") {
    console.log("Document is undefined");
    return undefined;
  }

  console.log("Document cookie:", document.cookie);

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
  return undefined;
}
