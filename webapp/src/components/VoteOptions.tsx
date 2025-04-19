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

  useEffect(() => {
    const stored = getVote(poll.id);
    if (stored) setSelected(stored);
  }, [poll.id, getVote]);

  useEffect(() => {
    const socket = new WebSocket(`ws://${window.location.hostname}:3001`);
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
      <div className="w-full md:w-1/2 space-y-4">
        {options.map((opt, index) => {
          const isSelected = selected.includes(opt.text);
          return (
            <div
              key={index}
              onClick={() => toggleOption(opt.text)}
              className={`cursor-pointer flex items-center justify-between p-4 rounded shadow transition ${
                isSelected
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-900 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg font-medium">{opt.text}</span>
              <span className="text-sm font-semibold">
                {opt.votes} {opt.votes === 1 ? "vote" : "votes"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VoteOptions;
