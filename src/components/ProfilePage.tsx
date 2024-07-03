"use client";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import useFetchUser from "../lib/UserFetch";

const ProfilePage = () => {
  // const { user, error, isLoading } = useUser();

  // if (isLoading) return <div>Loading...</div>;

  // const userData = user as unknown as { name: string; email: string };

  return (
    <div>
      {/* <h2>{userData?.name}</h2>
      <p>{userData?.email}</p> */}
      <h3>Profile Page</h3>
    </div>
  );
};

export default ProfilePage;
