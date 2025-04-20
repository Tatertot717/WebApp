//not on figma

import { Suspense } from "react";
import LoginPage from "@/src/components/pages/LoginPage";

export const metadata = {
  title: "PollsCheck - Login",
};

export default function Login() {
  return (
    <Suspense fallback={<div>Loading login page...</div>}>
      <LoginPage />
    </Suspense>
  );
}