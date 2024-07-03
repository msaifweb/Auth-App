// components/LogoutButton.tsx

import React from "react";

const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Logout successful");
        // Optionally, perform additional logout logic here (e.g., redirect)
        window.location.reload(); // Refresh the page after logout
      } else {
        const errorData = await response.json();
        console.error("Logout failed:", errorData.error);
      }
    } catch (error: any) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutButton;
