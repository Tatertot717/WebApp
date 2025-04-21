"use client";
import React, { useState, useEffect } from "react";
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
  const [pollItems, setPollItems] = useState<PollItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const res = await fetch("/api/polls");
        const data = await res.json();
        console.log("Poll data:", data);

        if (Array.isArray(data)) {
          setPollItems(data);
        } else {
          console.error("Polls response is not an array:", data);
          setPollItems([]);
        }
      } catch (error) {
        console.error("Failed to fetch polls:", error);
        setPollItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);

  const handleViewPoll = (pollId: number) => {
    window.location.href = `/poll/${pollId}`;
  };

  const pageNumbers = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div
      className="min-h-screen flex flex-col font-sans"
      style={{ backgroundColor: "#2c2c2c" }}
    >
      <Navbar />

      <div style={{ padding: "2rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
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

        <h2
          style={{ textAlign: "center", marginBottom: "1rem", color: "#FFF" }}
        >
          Existing Poll Questions
        </h2>

        {loading ? (
          <div style={{ color: "#FFF", textAlign: "center" }}>
            Loading polls...
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {pollItems.length === 0 ? (
              <div
                style={{
                  color: "#FFF",
                  textAlign: "center",
                  marginTop: "2rem",
                }}
              >
                No polls found. Be the first to{" "}
                <a href="/create-poll" style={{ color: "#3b82f6" }}>
                  create one!
                </a>
              </div>
            ) : (
              pollItems.map((item) => (
                <Poll
                  key={item.id}
                  {...item}
                  onViewPoll={handleViewPoll}
                />
              ))
            )}
          </div>
        )}

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <div style={{ color: "#bbb", marginBottom: "0.5rem" }}>
            3 polls per page
          </div>
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
                  backgroundColor:
                    currentPage === page ? "#2563eb" : "transparent",
                  color: currentPage === page ? "#FFF" : "#bbb",
                  fontWeight: currentPage === page ? "bold" : "normal",
                }}
              >
                {page}
              </span>
            ))}
            <span
              onClick={() =>
                setCurrentPage(currentPage < 10 ? currentPage + 1 : currentPage)
              }
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
