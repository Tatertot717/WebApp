"use client";
import React from "react";
import Image from "next/image";

interface PollProps {
  id: number;
  polltitle: string;
  pollImage: string;
  options: string[];
  allowmultiple: boolean;
  requirelogin: boolean;
  onViewPoll: (pollId: number) => void;
  ownerId?: string;
  currentUserId?: string;
  onDelete?: () => void;
}

const Poll: React.FC<PollProps> = ({
  id,
  polltitle,
  pollImage,
  onViewPoll,
  ownerId,
  currentUserId,
  onDelete,
}) => {
  const isOwner = !!ownerId && ownerId === currentUserId;

  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        borderRadius: "8px",
        margin: "1rem",
        width: "220px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        height: "100%", // ensures consistent card height
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "180px",
            overflow: "hidden",
            borderRadius: "4px",
          }}
        >
          <Image
            src={pollImage || "/bigpoll.png"}
            alt="Poll Question Image"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <p
          style={{
            marginTop: "1rem",
            fontWeight: "bold",
            color: "#FFF",
            fontSize: "0.95rem",
            textAlign: "center",
            minHeight: "48px", // to prevent bounce with short/long titles
          }}
        >
          {polltitle}
        </p>
      </div>

      <div style={{ marginTop: "auto", textAlign: "center" }}>
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
            width: "100%",
          }}
        >
          View Poll
        </button>

        {isOwner && onDelete && (
          <button
            onClick={() => onDelete()}
            style={{
              marginTop: "0.5rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#b91c1c",
              border: "none",
              borderRadius: "4px",
              color: "#FFF",
              fontWeight: "bold",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Poll;