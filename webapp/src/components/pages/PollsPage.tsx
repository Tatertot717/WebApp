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

  const [question, setQuestion] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [requireLogin, setRequireLogin] = useState(false);
  const [answerQ3, setAnswerQ3] = useState('');

 
  const pollItems: PollItem[] = [
    {
      id: 1,
      image:
        'batman.png',
      title:
        'Which superhero is your favorite?\n\n**Option A: Batman**\n**Option B: Superman**\n**Option C: Spider-Man**',
    },
    {
      id: 2,
      image:
        'spiderman.png',
      title:
        'What is your favorite superhero movie?\n\n**Option A: The Avengers**\n**Option B: Spider-Man: Homecoming**\n**Option C: Black Panther**',
    },
    {
      id: 3,
      image:
        'strange.png',
      title: 'Which superpower would you choose?\n\n',
    },
  ];

  
  const handleCreatePoll = () => {
    console.log({
      question,
      optionA,
      optionB,
      optionC,
      allowMultiple,
      requireLogin,
      answerQ3,
    });
    alert('Poll created (dummy handler)');
  };

  return (
    <div style={{ backgroundColor: '#2c2c2c', color: '#FFF', minHeight: '100vh' }}>
      {/* Header */}
      <Navbar/>

      {/* Main Content */}
      <div style={{ padding: '2rem' }}>
        {/* Poll Creation Form */}
        <div
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: '#3c3c3c',
            padding: '2rem',
            borderRadius: '8px',
          }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Create a New Poll</h2>

          {/* Poll Question */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              htmlFor="pollQuestion"
              style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}
            >
              Type your polls question here:
            </label>
            <input
              id="pollQuestion"
              type="text"
              placeholder="e.g., What is your favorite superhero?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />

            {/* Button to insert a picture */}
            <button
              style={{
                marginTop: '0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#64ffda',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                color: '#333',
                fontWeight: 'bold',
              }}
            >
              Click to insert your picture
            </button>
          </div>

       
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Type your options here:</p>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="optionA" style={{ marginRight: '0.5rem' }}>Option A:</label>
              <input
                id="optionA"
                type="text"
                placeholder="e.g., Batman"
                value={optionA}
                onChange={(e) => setOptionA(e.target.value)}
                style={{
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="optionB" style={{ marginRight: '0.5rem' }}>Option B:</label>
              <input
                id="optionB"
                type="text"
                placeholder="e.g., Superman"
                value={optionB}
                onChange={(e) => setOptionB(e.target.value)}
                style={{
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="optionC" style={{ marginRight: '0.5rem' }}>Option C:</label>
              <input
                id="optionC"
                type="text"
                placeholder="e.g., Spider-Man"
                value={optionC}
                onChange={(e) => setOptionC(e.target.value)}
                style={{
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
          </div>

          
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <input
                id="multipleChoices"
                type="checkbox"
                checked={allowMultiple}
                onChange={(e) => setAllowMultiple(e.target.checked)}
                style={{ marginRight: '0.5rem' }}
              />
              <label htmlFor="multipleChoices">Allow multiple choices</label>
            </div>
            <div>
              <input
                id="requireLogin"
                type="checkbox"
                checked={requireLogin}
                onChange={(e) => setRequireLogin(e.target.checked)}
                style={{ marginRight: '0.5rem' }}
              />
              <label htmlFor="requireLogin">Require login to vote</label>
            </div>
          </div>

          
          <div>
            <button
              onClick={handleCreatePoll}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                backgroundColor: '#64ffda',
                border: 'none',
                color: '#333',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Create Poll
            </button>
          </div>
        </div>

        {/* Existing Poll Options Section */}
        <div style={{ marginTop: '3rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Existing Poll Questions</h2>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {pollItems.map((item: PollItem) => (
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
                {/* Image */}
                <img
                  src={item.image}
                  alt="Poll Question Image"
                  style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                />
                {/* Bolded Question and Options */}
                {item.id !== 3 ? (
                  <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>
                    {item.title}
                  </p>
                ) : (
                  <>
                    <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>
                      {item.title}
                    </p>
                    <input
                      type="text"
                      value={answerQ3}
                      onChange={(e) => setAnswerQ3(e.target.value)}
                      placeholder="Type your answer here"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        marginTop: '0.5rem',
                      }}
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
            <Footer/>
    </div>
  );
};

export default PollsPage;

