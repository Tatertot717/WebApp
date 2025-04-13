"use client";

import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

interface PollItem {
  id: number;
  image: string;
  title: string;
}

const PollsPage = () => {
  const pollItems: PollItem[] = [
    {
      id: 1,
      image: "batman.png",
      title:
        "Which superhero is your favorite?\n\nOption A: Batman\nOption B: Superman\nOption C: Spider-Man",
    },
    {
      id: 2,
      image: "spiderman.png",
      title:
        "What is your favorite superhero movie?\n\nOption A: The Avengers\nOption B: Spider-Man: Homecoming\nOption C: Black Panther",
    },
    {
      id: 3,
      image: "strange.png",
      title:
        "Which superpower would you choose?\n\nOption A: Flight\nOption B: Superstrength\n",
    },
  ];

  return (
    <div
    className="min-h-screen flex flex-col bg-gray-100 font-sans"
      style={{ backgroundColor: "#2c2c2c", color: "#FFF", minHeight: "100vh" }
    }
    >
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow relative">
        <div style={{ padding: "2rem" }}>
          {/* Existing Poll Options Section */}
          <div style={{ marginTop: "3rem" }}>
            <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
              Existing Poll Questions
            </h2>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {pollItems.map((item: PollItem) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: "#1e1e1e",
                    borderRadius: "8px",
                    padding: "1rem",
                    margin: "1rem",
                    width: "220px",
                    textAlign: "center",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt="Poll Question Image"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "4px",
                    }}
                  />
                  {/* Bolded Question and Options */}
                  <div style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Footer */}
      </main>
      <Footer />
    </div>
  );
};

export default PollsPage;
