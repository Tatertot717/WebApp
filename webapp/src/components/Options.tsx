'use client'
import React from 'react';

type OptionsProps = {
    count: number;
    onChange: (values: string[]) => void;
  };

const Options: React.FC<OptionsProps> = ({ count, onChange }) => {
    const handleChange = (index: number, value: string) => {
      const updatedOptions = [...Array(count)].map((_, i) => i === index ? value : '');
      onChange(updatedOptions);
    };

  return (
    <div className="flex flex-col gap-2">
      {[...Array(count)].map((_, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Option ${index + 1}`}
          onChange={(e) => handleChange(index, e.target.value)}
          className="border p-2 rounded shadow-lg"
        />
      ))}
    </div>
  );
};

export default Options;
