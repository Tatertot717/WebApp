//log in / out
"use client";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/src/config/Authentication";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get("tab");

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { login } = useAuth();

  // Sync tab param to tab state
  useEffect(() => {
    if (tabParam === "signup") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [tabParam]);

  // Tab switcher that updates both UI + URL
  const handleTabSwitch = (tab: "login" | "signup") => {
    setIsLogin(tab === "login");
    router.push(`/login?tab=${tab}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && password !== confirmPassword)) {
      alert("Please fill out all fields correctly.");
      return;
    }

    login();
    router.push("/");
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-white">
      <Navbar />
      {/* background and login card section (same as before) */}
      <div
        className="flex-1 flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/splashBackground.jpg')" }}
      >
        <div className="bg-neutral-900 bg-opacity-90 p-8 rounded-lg shadow-lg w-96 relative z-10">
          <div className="flex justify-around mb-6 border-b border-gray-700 pb-2">
            <button
              onClick={() => handleTabSwitch("login")}
              className={`text-sm font-semibold px-2 ${
                isLogin
                  ? "text-white border-b-2 border-blue-500"
                  : "text-gray-400"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => handleTabSwitch("signup")}
              className={`text-sm font-semibold px-2 ${
                !isLogin
                  ? "text-white border-b-2 border-blue-500"
                  : "text-gray-400"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form content stays the same */}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="p-2 rounded bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 py-2 rounded font-semibold"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;
