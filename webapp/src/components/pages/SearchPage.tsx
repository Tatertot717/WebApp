import React from "react";
import { FaSearch } from "react-icons/fa";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Link from "next/link";

const SearchPage = () => {
  const loggedin = true; // change to false for unauthenticated view

  return (
    <div
      className="flex flex-col min-h-screen text-white"
      style={{ backgroundColor: "#2c2c2c" }}
    >
      <Navbar />

      <main className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center bg-gray-200 text-black rounded-full px-6 py-4 text-lg shadow-lg">
            <FaSearch className="mr-3 text-xl" />
            <input
              type="text"
              placeholder="Search for a public poll..."
              className="bg-transparent focus:outline-none w-full"
            />
          </div>

          {loggedin && (
            <Link
              href="/mypolls"
              className="text-blue-400 underline hover:text-blue-600 transition duration-200"
            >
              <p>My polls</p>
            </Link>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;
