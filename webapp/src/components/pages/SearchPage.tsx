"use client";

import React, { useState } from "react";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const isLoggedIn = !!session;

  const handleSearch = () => {
    const trimmed = query.trim();

    if (trimmed.length > 0) {
      router.push(`/polls?query=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/polls"); // show all polls if search is empty
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen text-whiteclassName bg-cover bg-center bg-no-repeat relative h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/splashBackground.jpg')" }}
    >
      <Navbar/>

      <main className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center bg-gray-200 text-black rounded-full px-6 py-4 text-lg shadow-lg w-80">
            <FaSearch className="mr-3 text-xl" />
            <input
              type="text"
              placeholder="Search for a public poll..."
              className="bg-transparent focus:outline-none w-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch}>
              <FaArrowRight className="text-xl text-blue-600 hover:text-blue-800 transition" />
            </button>
          </div>

          {isLoggedIn && session?.user?.id && (
            <button
              onClick={() => router.push(`/polls?user=${session.user.id}`)}
              className="text-blue-400 underline hover:text-blue-600 transition duration-200"
            >
              My polls
            </button>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;
