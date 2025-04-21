"use client";
import React from "react";

type OptionsProps = {
  values: string[];
  onChange: (values: string[]) => void;
};

const Options: React.FC<OptionsProps> = ({ values, onChange }) => {
  const handleChange = (index: number, value: string) => {
    const updated = [...values];
    updated[index] = value;
    onChange(updated);
  };

  return (
    <div className="flex flex-col gap-2">
      {values.map((val, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Option ${index + 1}`}
          value={val}
          onChange={(e) => handleChange(index, e.target.value)}
          className="border p-2 rounded shadow-lg"
        />
      ))}
    </div>
  );
};

export default Options;
