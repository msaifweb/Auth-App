"use client";
import React, { useEffect, useState } from "react";

const Users = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const token = ""; // Retrieve your token from wherever it's stored, e.g., local storage
        const response = await fetch("/api/decode", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setEmail(data.email);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchEmail();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!email) {
    return <div>Loading...</div>;
  }

  return <div className="text-3xl text-indigo-500">Logged in as: {email}</div>;
};
export default Users;
