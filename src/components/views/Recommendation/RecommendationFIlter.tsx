'use client';

import { useState } from 'react';

const sourceOptions = ['All', 'Book', 'Educational Content', 'Financial Influencer'];

export default function RecommendationFilter({
  onChange,
}: {
  onChange: (source: string) => void;
}) {
  const [selected, setSelected] = useState('All');

  const handleSelect = (source: string) => {
    setSelected(source);
    onChange(source);
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {sourceOptions.map((source) => (
        <button
          key={source}
          onClick={() => handleSelect(source)}
          className={`px-4 py-1 rounded-full border text-sm transition cursor-pointer
            ${selected === source
              ? 'bg-primary text-white'
              : 'bg-white text-gray-600 border-gray-300 hover:bg-blue-50'}
          `}
        >
          {source}
        </button>
      ))}
    </div>
  );
}
