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

  
  const handleOptionToggle = (pollId: number, optionText: string) => {
    setSelectedOptions((prev) => {
      const currentSelections = prev[pollId] || [];
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

 
  const pageNumbers = Array.from({ length: 10 }, (_, i) => i + 1);

  
  const handlePollSubmit = (pollId: number) => {
    alert(`Poll #${pollId} submitted. Selected options: ${selectedOptions[pollId]?.join(', ') || 'none'}`);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: '#2c2c2c' }}>
    
      <Navbar />

      <div style={{ padding: '2rem' }}>
       
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
              cursor: 'pointer',
            }}
          >
            Search A Poll
          </button>
          <button
            onClick={() => (window.location.href = '/create-poll')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#374151',
              border: 'none',
              borderRadius: '4px',
              color: '#FFF',
              cursor: 'pointer',
            }}
          >
            Create A Poll
          </button>
        </div>

        
        <div style={{ marginTop: '1rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Existing Poll Questions</h2>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {pollItems.map((item) => {
              
              if (item.id === 3) {
                return (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: '#1e1e1e',
                      borderRadius: '8px',
                      margin: '1rem',
                      width: '220px',
                      textAlign: 'center',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',

                      
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '1rem',
                      minHeight: '360px',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    <div>
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
                    <button
                      onClick={() => handlePollSubmit(item.id)}
                      style={{
                        marginTop: '1rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: '#374151',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#FFF',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                    >
                      Submit Poll
                    </button>
                  </div>
                );
              } else {
                
                const parts = item.title.split('\n').filter((part) => part.trim() !== '');
                const questionText = parts[0];
                const optionLines = parts.slice(1);
                const currentSelections = selectedOptions[item.id] || [];

                return (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: '#1e1e1e',
                      borderRadius: '8px',
                      margin: '1rem',
                      width: '220px',
                      textAlign: 'center',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',

                      
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '1rem',
                      minHeight: '360px',
                    }}
                  >
                    <div>
                      <img
                        src={item.image}
                        alt="Poll Question Image"
                        style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                      />
                      <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{questionText}</p>
                      {optionLines.map((line, idx) => {
                        const cleanText = line.replace(/\*\*/g, '');
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
                                fontSize: '14px',
                                fontWeight: 'bold',
                                color: '#FFF',
                                lineHeight: '1.2',
                              }}
                            >
                              {cleanText}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => handlePollSubmit(item.id)}
                      style={{
                        marginTop: '1rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: '#374151',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#FFF',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                    >
                      Submit Poll
                    </button>
                  </div>
                );
              }
            })}
          </div>
        </div>

      
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

   
      <Footer />
    </div>
  );
};

export default PollsPage;
