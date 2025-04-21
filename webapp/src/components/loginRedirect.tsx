"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LoginRedirectNotice = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login?tab=login");
    }, 2000); // redirect after 2 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="text-center text-red-600 font-medium mt-4">
      You must be logged in to do that. Redirecting to sign up...
    </div>
  );
};

export default LoginRedirectNotice;
