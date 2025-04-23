//log in / out
"use client";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get("tab");

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ creds?: string; username?: string; matchpass?: string; loginafter?: string; signin?: string; login?: string }>({});

  useEffect(() => {
    if (tabParam === "signup") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [tabParam]);

  const handleTabSwitch = (tab: "login" | "signup") => {
    setIsLogin(tab === "login");
    router.push(`/login?tab=${tab}`);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const Errors: { creds?: string; username?: string; matchpass?: string; loginafter?: string; signin?: string; login?: string } = {};

    if (!email || !password) {
      Errors.creds = "Email and password are required.";
    }

    if (!isLogin) {
      if (!username.trim()) {
        Errors.username = "Username is required.";
      }

      if (password !== confirmPassword) {
        Errors.matchpass = "Passwords do not match.";
      }

      if (Object.keys(Errors).length > 0) {
        setErrors(Errors);
        return;
      }
      setErrors({});

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
      });

      if (res.ok) {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (!result?.error) {
          router.push("/");
        } else {
          Errors.loginafter = "Login after signup failed.";
        }
      } else {
        const data = await res.json();
        Errors.signin = data.message || "Sign up failed.";
      }
    } else {
      // Regular login
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        Errors.login = "Login failed: " + result.error;
      } else {
        router.push("/");
      }
    }
    if (Object.keys(Errors).length > 0) {
      setErrors(Errors);
      return;
    }
    setErrors({});
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-white">
      <Navbar />
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

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-2 rounded bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
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
            {errors.creds && <p className="text-red-500 text-sm mt-1">{errors.creds}</p>}

            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="p-2 rounded bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            {errors.matchpass && <p className="text-red-500 text-sm mt-1">{errors.matchpass}</p>}

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 py-2 rounded font-semibold"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          {errors.signin && <p className="text-red-500 text-sm mt-1">{errors.signin}</p>}
          {errors.loginafter && <p className="text-red-500 text-sm mt-1">{errors.loginafter}</p>}
          {errors.login && <p className="text-red-500 text-sm mt-1">{errors.login}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;