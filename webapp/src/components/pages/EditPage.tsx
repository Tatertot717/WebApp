"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Options from "@/src/components/Options";

type Poll = {
  id: string;
  polltitle: string;
  pollImage: string;
  options: string[];
  allowmultiple: boolean;
  requirelogin: boolean;
};

export default function EditPollPage({ poll }: { poll: Poll }) {
  const router = useRouter();

  const [pollTitle, setPollTitle] = useState(poll.polltitle);
  const [options, setOptions] = useState(poll.options);
  const [pollImage, setPollImage] = useState(poll.pollImage);
  const [allowMultiple, setAllowMultiple] = useState(poll.allowmultiple);
  const [requireLogin, setRequireLogin] = useState(poll.requirelogin);
  const [errors, setErrors] = useState<{ title?: string; options?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = pollTitle.trim();
    const nonBlankOptions = options.map((opt) => opt.trim()).filter((opt) => opt !== "");

    const Errors: typeof errors = {};
    if (!trimmedTitle) Errors.title = "Poll title is required.";
    if (nonBlankOptions.length < 2) Errors.options = "At least 2 options are required.";
    if (Object.keys(Errors).length > 0) {
      setErrors(Errors);
      return;
    }

    try {
      const res = await fetch(`/api/polls?id=${poll.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          polltitle: trimmedTitle,
          pollImage: pollImage.trim(),
          options: nonBlankOptions,
          allowmultiple: allowMultiple,
          requirelogin: requireLogin,
        }),
      });      

      if (!res.ok) {
        console.error("Error updating poll");
        return;
      }

      const updatedPoll = await res.json();
      router.push(`/poll/${updatedPoll.id || updatedPoll._id}`);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg max-w-md w-full px-6 py-8 text-center space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4">Edit Poll</h2>

      <input
        value={pollTitle}
        onChange={(e) => setPollTitle(e.target.value)}
        placeholder="Poll title"
        className="w-full p-3 bg-gray-200 rounded shadow"
      />
      {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

      <input
        value={pollImage}
        onChange={(e) => setPollImage(e.target.value)}
        placeholder="Image URL (optional)"
        className="w-full p-3 bg-gray-200 rounded shadow"
      />

      <Options values={options} onChange={setOptions} />
      {errors.options && <p className="text-red-500 text-sm">{errors.options}</p>}

      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={allowMultiple}
          onChange={(e) => setAllowMultiple(e.target.checked)}
        />
        <label>Allow multiple choices</label>
      </div>

      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={requireLogin}
          onChange={(e) => setRequireLogin(e.target.checked)}
        />
        <label>Require login to vote</label>
      </div>

      <input
        type="submit"
        value="Update Poll"
        className="w-full p-3 bg-gray-300 rounded hover:bg-gray-400"
      />
    </form>
  );
}