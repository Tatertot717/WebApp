"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const isLoggedIn = !!session;
  const user = session?.user;

  return (
    <header className="w-full flex justify-between items-center px-10 py-4 bg-neutral-900 shadow-md z-20 font-sans">
      <Link href="/">
        <h1 className="text-2xl font-bold text-white">PollsCheck</h1>
      </Link>
      <div className="flex items-center space-x-4">
        {isLoggedIn && user ? (
          <>
            <span className="text-sm text-gray-300">Hello, {user.name || "User"}</span>
            <button
              onClick={() => {
                signOut({ callbackUrl: "/" });
              }}
              className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-sm font-medium"
            >
              Logout
            </button>
          </>
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