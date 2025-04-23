"use client";
import React, { useState, useEffect } from "react";
import { useVote } from "@/src/components/Votes";

interface PollOption {
  text: string;
  votes: number;
  id?: string;
}

interface PollType {
  id: string;
  polltitle: string;
  options: PollOption[];
  allowmultiple: boolean;
  requirelogin: boolean;
}

const VoteOptions: React.FC<{ poll: PollType }> = ({ poll }) => {
  const { getVote, setVote } = useVote();
  const [selected, setSelected] = useState<string[]>([]);
  const [options, setOptions] = useState<PollOption[]>(poll.options);
  const totalVotes = options.reduce((acc, opt) => acc + opt.votes, 0);

  useEffect(() => {
    const stored = getVote(poll.id);
    if (stored) setSelected(stored);
  }, [poll.id, getVote]);

  useEffect(() => {
    const socket = new WebSocket("wss://poll.tatejsmith.com/ws");
    socket.onopen = () => {
      console.log("Connected to WS server");
      socket.send(JSON.stringify({ type: "subscribe", pollId: poll.id }));
    };
    socket.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.type === "update" && data.pollId === poll.id) {
        setOptions(data.options);
      }
    };
    return () => socket.close();
  }, [poll.id]);

  const toggleOption = async (option: string) => {
    const previous = [...selected];

    let updated;
    if (poll.allowmultiple) {
      updated = selected.includes(option)
        ? selected.filter((opt) => opt !== option)
        : [...selected, option];
    } else {
      updated = [option];
    }

    setSelected(updated);
    setVote(poll.id, updated);

    await fetch(`/api/polls/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pollId: poll.id,
        options: updated,
        previousOptions: previous,
      }),
    });
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-3xl space-y-4 rounded-lg p-6 shadow-md bg-neutral-800">
        {options.map((opt, index) => {
          const isSelected = selected.includes(opt.text);
          const percentage =
            totalVotes > 0 ? (opt.votes / totalVotes) * 100 : 0;

          return (
            <div
              key={index}
              onClick={() => toggleOption(opt.text)}
              className={`relative cursor-pointer p-4 shadow shadow-grey transition-colors duration-300 bg-white hover:bg-grey-100 rounded-md overflow-hidden ${
                isSelected ? "border-4 border-gray-700" : ""
              }`}
            >
              {/* Selected Background (Gray) */}
              {isSelected && (
                <div className="absolute top-0 left-0 h-full w-full bg-gray-700 z-0"></div>
              )}

              {/* Vote Percentage Overlay (Blue) */}
              <div
                className="absolute top-0 left-0 h-full bg-blue-600 z-10 transition-all duration-700 ease-in-out"
                style={{ width: `${percentage}%` }}
              ></div>

              {/* Foreground Content */}
              <div
                className={`relative z-20 flex items-center justify-between transition-colors duration-300 ${
                  isSelected || percentage > 90 ? "text-white" : "text-black"
                }`}
              >
                <span className="text-lg font-medium">{opt.text}</span>
                <span className="text-sm font-semibold">
                  {opt.votes} {opt.votes === 1 ? "vote" : "votes"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VoteOptions;
