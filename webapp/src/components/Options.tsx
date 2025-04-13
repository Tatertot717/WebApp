"use client";
import React from "react";

type OptionsProps = {
  count: number;
  onChange: (values: string[]) => void;
};

const Options: React.FC<OptionsProps> = ({ count, onChange }) => {
  const [values, setValues] = React.useState<string[]>(Array(count).fill(""));

  React.useEffect(() => {
    setValues((prev) => {
      const newValues = [...prev];
      while (newValues.length < count) newValues.push("");
      return newValues.slice(0, count);
    });
  }, [count]);

  const handleChange = (index: number, value: string) => {
    const updated = [...values];
    updated[index] = value;
    setValues(updated);
    onChange(updated);
  };

  return (
    <div className="flex flex-col gap-2">
      {Array(count)
        .fill(null)
        .map((_, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={values[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            className="border p-2 rounded shadow-lg"
          />
        ))}
    </div>
  );
};

export default Options;
