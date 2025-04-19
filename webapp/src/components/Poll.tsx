"use client";
import React from "react";

interface PollProps {
  id: number;
  polltitle: string;
  pollImage: string;
  options: string[];
  allowmultiple: boolean;
  requirelogin: boolean;
  onViewPoll: (pollId: number) => void;
}

const Poll: React.FC<PollProps> = ({
  id,
  polltitle,
  pollImage,
  options,
  allowmultiple,
  requirelogin,
  onViewPoll,
}) => {
  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        borderRadius: "8px",
        margin: "1rem",
        width: "220px",
        textAlign: "center",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1rem",
        minHeight: "360px",
      }}
    >
      <div>
        <img
          src={pollImage || "/bigpoll.png"}
          alt="Poll Question Image"
          style={{ width: "100%", height: "auto", borderRadius: "4px" }}
        />
        <p style={{ marginTop: "1rem", fontWeight: "bold", color: "#FFF" }}>
          {polltitle}
        </p>
      </div>
      <button
        onClick={() => onViewPoll(id)}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#374151",
          border: "none",
          borderRadius: "4px",
          color: "#FFF",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        View Poll
      </button>
    </div>
  );
};

export default Poll;
