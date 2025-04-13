// PollsPage.tsx
import React from 'react';
import Navbar from '../Navbar';

interface PollItem {
  id: number;
  image: string;
  title: string;
}

const PollsPage: React.FC = () => {
  
  const items: PollItem[] = [
    {
      id: 1,
      image: 'https://upload.wikimedia.org/wikipedia/en/8/87/Batman_DC_Comics.png',
      title: 'Batman Option A'
    },
    {
      id: 2,
      image: 'https://upload.wikimedia.org/wikipedia/en/2/22/Batman_%28The_Dark_Knight_trilogy%29.jpg',
      title: 'Batman Option B'
    },
    {
      id: 3,
      image: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Batman_The_Animated_Series.png',
      title: 'Batman Option C'
    }
  ];

  return (
    <div>
      <Navbar />
      <h1>Polls go here</h1>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      
        {items.map((item: PollItem) => (
          <div key={item.id} style={{ textAlign: 'center', margin: '1rem' }}>
            <img
              src={item.image}
              alt={item.title}
              style={{ width: '150px', height: 'auto' }}
            />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PollsPage;
