"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Options from "../Options";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useSession } from "next-auth/react";
import LoginRedirectNotice from "../loginRedirect";

const CreatePage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoggedIn = !!session;

  const [pollTitle, setPollTitle] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [requireLogin, setRequireLogin] = useState(false);
  const [pollImage, setPollImage] = useState("");
  const [errors, setErrors] = useState<{ title?: string; options?: string }>({});

  if (status !== "loading" && !isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white font-sans h-screen bg-cover bg-center" style={{ backgroundImage: "url('/splashBackground.jpg')" }}>
        <Navbar />
        <main className="flex-grow flex items-center justify-center text-black">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full px-6 py-8 text-center">
            <h1 className="text-2xl font-semibold mb-2">Create a Poll</h1>
            <p className="mb-4">You must be logged in to create a poll.</p>
            <LoginRedirectNotice />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleOptionsChange = (values: string[]) => setOptions(values);
  const handleAddOption = () => setOptions((prev) => [...prev, ""]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = pollTitle.trim();
    const nonBlankOptions = options.map((opt) => opt.trim()).filter((opt) => opt !== "");

    const Errors: { title?: string; options?: string } = {};
    if (!trimmedTitle) Errors.title = "Poll title is required.";
    if (nonBlankOptions.length < 2) Errors.options = "At least 2 options are required.";
    if (Object.keys(Errors).length > 0) {
      setErrors(Errors);
      return;
    }

    setErrors({});

    const pollData = {
      polltitle: trimmedTitle,
      pollImage: pollImage.trim(),
      options: nonBlankOptions,
      allowmultiple: allowMultiple,
      requirelogin: requireLogin,
      owner: session?.user?.id,
    };

    try {
      const res = await fetch("/api/polls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pollData),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Error creating poll:", error);
        return;
      }

      const savedPoll = await res.json();
      router.push(`/poll/${savedPoll.id || savedPoll._id}`);
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white font-sans" style={{ backgroundImage: "url('/splashBackground.jpg')" }}>
      <Navbar />
      <main className="flex-grow relative">
        <div className="flex justify-center items-center py-10 text-black">
          <div className="w-full max-w-md bg-white p-8 rounded shadow">
            <h2 className="text-2xl font-semibold mb-6 text-center">Create A Poll</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={pollTitle}
                onChange={(e) => setPollTitle(e.target.value)}
                placeholder="Enter poll question here"
                className="w-full p-3 bg-gray-200 rounded focus:outline-none shadow-lg"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}

              <input
                type="text"
                value={pollImage}
                onChange={(e) => setPollImage(e.target.value)}
                placeholder="Poll image URL (optional)"
                className="border p-2 rounded shadow-lg w-full"
              />

              <div className="my-4 border-t border-gray-300" />

              <h3 className="text-lg font-medium mb-2">Poll Options</h3>
              <Options values={options} onChange={handleOptionsChange} />
              {errors.options && <p className="text-red-500 text-sm mt-1">{errors.options}</p>}

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleAddOption}
                  className="w-10 h-10 rounded-full bg-black text-white text-2xl flex items-center justify-center hover:scale-110 transition"
                  aria-label="Add Option"
                >
                  +
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="multichoice"
                  checked={allowMultiple}
                  onChange={(e) => setAllowMultiple(e.target.checked)}
                  className="h-4 w-4"
                />
                <label htmlFor="multichoice" className="text-sm">Allow multiple choices</label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="loginreq"
                  checked={requireLogin}
                  onChange={(e) => setRequireLogin(e.target.checked)}
                  className="h-4 w-4"
                />
                <label htmlFor="loginreq" className="text-sm">Require login to vote</label>
              </div>

              <input
                type="submit"
                value="Create Poll"
                className="w-full py-3 bg-gray-300 text-gray-700 rounded text-lg cursor-pointer hover:bg-gray-400 transition shadow"
              />
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreatePage;
