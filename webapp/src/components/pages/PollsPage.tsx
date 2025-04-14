"use client";
import React, { useState } from "react";
import Poll from "../Poll";
import Navbar from "../Navbar";
import Footer from "../Footer";

interface PollItem {
  id: number;
  polltitle: string;
  pollImage: string;
  options: string[];
  allowmultiple: boolean;
  requirelogin: boolean;
}

const Polls: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const pollItems: PollItem[] = [
    {
      id: 1,
      polltitle: "Which superhero is your favorite?",
      pollImage: "batman.png",
      options: ["Batman", "Superman", "Spider-Man"],
      allowmultiple: false,
      requirelogin: false,
    },
    {
      id: 2,
      polltitle: "What is your favorite superhero movie?",
      pollImage: "spiderman.png",
      options: ["The Avengers", "Spider-Man: Homecoming", "Black Panther"],
      allowmultiple: false,
      requirelogin: false,
    },
    {
      id: 3,
      polltitle: "Which superpower would you choose?",
      pollImage: "strange.png",
      options: ["Invisibility", "Teleportation", "Time Control"],
      allowmultiple: true,
      requirelogin: true,
    },
  ];

  const handleViewPoll = (pollId: number) => {
    window.location.href = `/poll/${pollId}`;
  };

  const pageNumbers = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: "#2c2c2c" }}>
      <Navbar />

      <div style={{ padding: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
          <button
            onClick={() => (window.location.href = "/search")}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#374151",
              border: "none",
              borderRadius: "4px",
              color: "#FFF",
              cursor: "pointer",
            }}
          >
            Search A Poll
          </button>
          <button
            onClick={() => (window.location.href = "/create-poll")}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#374151",
              border: "none",
              borderRadius: "4px",
              color: "#FFF",
              cursor: "pointer",
            }}
          >
            Create A Poll
          </button>
        </div>

        <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#FFF" }}>Existing Poll Questions</h2>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
          {pollItems.map((item) => (
            <Poll key={item.id} {...item} onViewPoll={handleViewPoll} />
          ))}
        </div>

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <div style={{ color: "#bbb", marginBottom: "0.5rem" }}>3 polls per page</div>
          <div style={{ display: "inline-block" }}>
            {pageNumbers.map((page) => (
              <span
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  margin: "0 0.5rem",
                  cursor: "pointer",
                  padding: "0.3rem 0.6rem",
                  borderRadius: "4px",
                  backgroundColor: currentPage === page ? "#2563eb" : "transparent",
                  color: currentPage === page ? "#FFF" : "#bbb",
                  fontWeight: currentPage === page ? "bold" : "normal",
                }}
              >
                {page}
              </span>
            ))}
            <span
              onClick={() => setCurrentPage(currentPage < 10 ? currentPage + 1 : currentPage)}
              style={{
                margin: "0 0.5rem",
                cursor: "pointer",
                color: "#bbb",
              }}
            >
              Next
            </span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Polls;
