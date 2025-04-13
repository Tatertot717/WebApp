
import React from 'react';

const Item = ({ item }) => (
  <div
    style={{
      border: '1px solid #333',
      borderRadius: '8px',
      padding: '1rem',
      margin: '0.5rem',
      textAlign: 'center'
    }}
  >
    <img
      src={item.image}
      alt={item.title}
      style={{ width: '100%', maxWidth: '150px', height: 'auto', display: 'block', margin: '0 auto' }}
    />
    <h3>{item.title}</h3>
  </div>
);

const ItemsList = () => {
  const itemsData = [
    {
      id: 1,
      image: 'https://via.placeholder.com/150/0000FF/808080',
      title: 'Poll Option A'
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/150/FF0000/FFFFFF',
      title: 'Poll Option B'
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/150/00FF00/000000',
      title: 'Poll Option C'
    }
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      {itemsData.map(item => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};


const App = () => (
  <div style={{ textAlign: 'center', padding: '2rem' }}>
    <h1>List of Items</h1>
    <ItemsList />
  </div>
);

export default App;
