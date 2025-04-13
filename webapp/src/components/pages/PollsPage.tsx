"use client";

import React, { useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

interface PollItem {
  id: number;
  image: string;
  title: string;
}

const PollsPage: React.FC = () => {
  // We'll track selected options as an array for each poll item.
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string[] }>({});
  const [currentPage, setCurrentPage] = useState(1);

  const pollItems: PollItem[] = [
    {
      id: 1,
      image: 'batman.png',
      title:
        'Which superhero is your favorite?\n\n**Option A: Batman**\n**Option B: Superman**\n**Option C: Spider-Man**',
    },
    {
      id: 2,
      image: 'spiderman.png',
      title:
        'What is your favorite superhero movie?\n\n**Option A: The Avengers**\n**Option B: Spider-Man: Homecoming**\n**Option C: Black Panther**',
    },
    {
      id: 3,
      image: 'strange.png',
      title: 'Which superpower would you choose?\n\n',
    },
  ];

  // Toggle checkbox selection for a given poll and option
  const handleOptionToggle = (pollId: number, optionText: string) => {
    setSelectedOptions((prev) => {
      const currentSelections = prev[pollId] || [];
      // Toggle: if the option is already selected, remove it; otherwise, add it.
      if (currentSelections.includes(optionText)) {
        return {
          ...prev,
          [pollId]: currentSelections.filter((opt) => opt !== optionText),
        };
      } else {
        return {
          ...prev,
          [pollId]: [...currentSelections, optionText],
        };
      }
    });
  };

  // Create an array of page numbers [1..10]
  const pageNumbers = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div
      className="min-h-screen flex flex-col font-sans"
      style={{ backgroundColor: '#2c2c2c' }}
    >
      {/* Header */}
      <Navbar />

      <div style={{ padding: '2rem' }}>
        {/* Centered Buttons Above Existing Poll Questions */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '1rem',
          }}
        >
          <button
            onClick={() => (window.location.href = '/search')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#374151', 
              border: 'none',
              borderRadius: '4px',
              color: '#FFF',
              fontWeight: '',
              cursor: 'pointer',
            }}
          >
            search a poll
          </button>
          <button
            onClick={() => (window.location.href = '/create-poll')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#374151', 
              border: 'none',
              borderRadius: '4px',
              color: '#FFF',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            create a poll
          </button>
        </div>

        {/* Existing Poll Options Section */}
        <div style={{ marginTop: '1rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
            Existing Poll Questions
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {pollItems.map((item) => {
              if (item.id === 3) {
                // For poll item 3, display with a text input.
                return (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: '#1e1e1e',
                      borderRadius: '8px',
                      padding: '1rem',
                      margin: '1rem',
                      width: '220px',
                      textAlign: 'center',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    <img
                      src={item.image}
                      alt="Poll Question Image"
                      style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                    />
                    <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{item.title}</p>
                    <input
                      type="text"
                      placeholder="Type your answer here"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        marginTop: '0.5rem',
                      }}
                    />
                  </div>
                );
              } else {
                // For poll items 1 and 2, we split the title into a question and options.
                const parts = item.title.split('\n').filter((part) => part.trim() !== '');
                const questionText = parts[0];
                const optionLines = parts.slice(1);

                return (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: '#1e1e1e',
                      borderRadius: '8px',
                      padding: '1rem',
                      margin: '1rem',
                      width: '220px',
                      textAlign: 'center',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    <img
                      src={item.image}
                      alt="Poll Question Image"
                      style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                    />
                    <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{questionText}</p>
                    {optionLines.map((line, idx) => {
                      // Remove the asterisks for display.
                      const cleanText = line.replace(/\*\*/g, '');
                      const currentSelections = selectedOptions[item.id] || [];
                      const isSelected = currentSelections.includes(cleanText);

                      return (
                        <div
                          key={idx}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '20px 1fr',
                            gap: '0.5rem',
                            alignItems: 'center',
                            margin: '0.5rem 0',
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleOptionToggle(item.id, cleanText)}
                            style={{
                              width: '20px',
                              height: '20px',
                              accentColor: isSelected ? '#2563eb' : undefined,
                            }}
                          />
                          <span
                            style={{
                              fontSize: '14px', // consistent font size
                              fontWeight: 'bold',
                              color: '#FFF', // ensure consistent color
                              lineHeight: '1.2',
                            }}
                          >
                            {cleanText}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              }
            })}
          </div>
        </div>

        {/* Pagination Controls */}
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <div style={{ color: '#bbb', marginBottom: '0.5rem' }}>3 polls per page</div>
          <div style={{ display: 'inline-block' }}>
            {pageNumbers.map((page) => (
              <span
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  margin: '0 0.5rem',
                  cursor: 'pointer',
                  padding: '0.3rem 0.6rem',
                  borderRadius: '4px',
                  backgroundColor: currentPage === page ? '#2563eb' : 'transparent',
                  color: currentPage === page ? '#FFF' : '#bbb',
                  fontWeight: currentPage === page ? 'bold' : 'normal',
                }}
              >
                {page}
              </span>
            ))}
            <span
              onClick={() => setCurrentPage(currentPage < 10 ? currentPage + 1 : currentPage)}
              style={{
                margin: '0 0.5rem',
                cursor: 'pointer',
              }}
            >
              Next
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PollsPage;
