"use client";
import Link from "next/link";
import { useAuth } from "../config/authentication";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="w-full flex justify-between items-center px-10 py-4 bg-neutral-900 shadow-md z-20 font-sans">
      <Link href="/">
        <h1 className="text-2xl font-bold">PollsCheck</h1>
      </Link>
      <div className="space-x-4">
        {isLoggedIn ? (
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-sm font-medium"
          >
            Logout
          </button>
        ) : (
          <>
            <Link href="/login?tab=login">
              <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm font-medium">
                Login
              </button>
            </Link>
            <Link href="/login?tab=signup">
              <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-sm font-medium">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
