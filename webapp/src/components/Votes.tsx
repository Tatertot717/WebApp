"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface VoteContextType {
  getVote: (pollId: string) => string[];
  setVote: (pollId: string, options: string[]) => void;
}

const VoteContext = createContext<VoteContextType | null>(null);

export const useVote = () => {
  const ctx = useContext(VoteContext);
  if (!ctx) throw new Error("useVote must be used inside VoteProvider");
  return ctx;
};

export const VoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [votes, setVotes] = useState<{ [pollId: string]: string[] }>({});

  useEffect(() => {
    const storedVotes = localStorage.getItem("pollVotes");
    if (storedVotes) {
      setVotes(JSON.parse(storedVotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pollVotes", JSON.stringify(votes));
  }, [votes]);

  const getVote = (pollId: string) => votes[pollId] || [];
  const setVote = (pollId: string, options: string[]) => {
    setVotes((prev) => ({ ...prev, [pollId]: options }));
  };

  return (
    <VoteContext.Provider value={{ getVote, setVote }}>
      {children}
    </VoteContext.Provider>
  );
};
