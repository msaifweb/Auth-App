// src/components/ProfilePage.tsx
"use client";
// import { useSession } from "next-auth/react";

const ProfilePage = () => {
  // const { data: session, status } = useSession();

  // You can use `status` to handle loading state
  const loading = status === "loading";

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      {/* {session ? (
        <div>
          <p>Welcome, {session.user?.name}</p>
          <p>Email: {session.user?.email}</p>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )} */}
    </div>
  );
};

export default ProfilePage;
