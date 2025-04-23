"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
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
  owner: string;
}

const Polls: React.FC = () => {
  const [pollItems, setPollItems] = useState<PollItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("query");
  const userParam = searchParams.get("user");

  const { data: session } = useSession();
  const currentUserId = session?.user?.id;

  const pollsPerPage = 5;
  const startIndex = (currentPage - 1) * pollsPerPage;
  const paginatedPolls = pollItems.slice(startIndex, startIndex + pollsPerPage);
  const totalPages = Math.ceil(pollItems.length / pollsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    const fetchPolls = async () => {
      setCurrentPage(1);
      try {
        let url = "/api/polls";

        if (queryParam) {
          url += `?polltitle=${encodeURIComponent(queryParam)}`;
        } else if (userParam) {
          url += `?owner=${encodeURIComponent(userParam)}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setPollItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch polls:", error);
        setPollItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, [queryParam, userParam]);

  const handleViewPoll = (pollId: number) => {
    window.location.href = `/poll/${pollId}`;
  };

  const handleDelete = async (pollId: number) => {
    const res = await fetch(`/api/polls?id=${pollId}`, { method: "DELETE" });
    if (res.ok) {
      setPollItems((prev) => prev.filter((item) => item.id !== pollId));
    } else {
      console.error("Failed to delete poll");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col font-sans"
      style={{ backgroundColor: "#2c2c2c" }}
    >
      <Navbar />

      <div className="flex-1" style={{ padding: "1rem" }}>
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
              padding: "0.5rem 0.5rem",
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
                  marginTop: "0rem",
                  marginBottom: "0rem"
                }}
              >
                No polls found. Be the first to{" "}
                <a href="/create-poll" style={{ color: "#3b82f6" }}>
                  create one!
                </a>
              </div>
            ) : (
              paginatedPolls.map((item) => (
                <Poll
                  key={item.id}
                  id={item.id}
                  polltitle={item.polltitle}
                  pollImage={item.pollImage}
                  options={item.options}
                  allowmultiple={item.allowmultiple}
                  requirelogin={item.requirelogin}
                  ownerId={item.owner}
                  currentUserId={currentUserId}
                  onViewPoll={handleViewPoll}
                  onDelete={() => handleDelete(item.id)}
                />
              ))
            )}
          </div>
        )}

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          {/*<div style={{ color: "#bbb", marginBottom: "0.5rem" }}>
            5 polls per page
          </div>*/}
          <div style={{ display: "inline-block" }}>
            <span
              onClick={() =>
                setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
              }
              style={{
                margin: "0 0.5rem",
                cursor: currentPage > 1 ? "pointer" : "not-allowed",
                color: "#bbb",
              }}
            >
              Previous
            </span>
            {pageNumbers.map((page) => (
              <span
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  margin: "0 0.5rem",
                  cursor: "pointer",
                  padding: "0.3rem 0.3rem",
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
                setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
              }
              style={{
                margin: "0 0.5rem",
                cursor: currentPage < totalPages ? "pointer" : "not-allowed",
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
