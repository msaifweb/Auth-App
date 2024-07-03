// components/ProtectedRoute.tsx

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useToken } from "@/lib/UseToken";

const ProtectedRoute: React.FC = ({ children }: any) => {
  const { getToken } = useToken();
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login"); // Redirect to login if no token
    }
  }, [getToken, router]);

  return <>{children}</>;
};

export default ProtectedRoute;
