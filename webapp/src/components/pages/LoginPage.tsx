//log in / out
"use client";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useState } from "react";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col min-h-screen font-sans text-white">
      {/* Header */}
      <Navbar />

      {/* Middle Section with Background */}
      <div
        className="flex-1 flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/splashBackground.jpg')" }}
      >
        
        {/* Login Card */}
        <div className="bg-neutral-900 bg-opacity-90 p-8 rounded-lg shadow-lg w-96 relative z-10">
          {/* Tabs */}
          <div className="flex justify-around mb-6 border-b border-gray-700 pb-2">
            <button
              onClick={() => setIsLogin(true)}
              className={`text-sm font-semibold px-2 ${
                isLogin
                  ? "text-white border-b-2 border-blue-500"
                  : "text-gray-400"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`text-sm font-semibold px-2 ${
                !isLogin
                  ? "text-white border-b-2 border-blue-500"
                  : "text-gray-400"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="p-2 rounded bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2 rounded bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LoginPage;
