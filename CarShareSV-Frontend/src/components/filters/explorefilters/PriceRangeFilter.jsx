import React, { useEffect, useState } from 'react';

const PriceRangeFilter = ({ setFilter, resetKey }) => {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  useEffect(() => {
    // Reset min and max values when resetKey changes
    setMin("");
    setMax("");
  }, [resetKey]);

  const handleMinChange = (e) => {
    const minPrice = e.target.value;
    setMin(minPrice);
    setFilter((prevFilter) => ({
      ...prevFilter,
      min: minPrice ? parseFloat(minPrice) : null
    }));
  }

  const handleMaxChange = (e) => {
    const maxPrice = e.target.value;
    setMax(maxPrice);
    setFilter((prevFilter) => ({
      ...prevFilter,
      max: maxPrice ? parseFloat(maxPrice) : null
    }));
  }

  return (
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <input
        type="number"
        placeholder="Min $"
        value={min}
        onChange={handleMinChange}
        className="bg-white border border-gray-300 rounded-md px-2 py-1 w-20 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <span className="text-gray-400">-</span>
      <input
        type="number"
        placeholder="Max $"
        value={max}
        onChange={handleMaxChange}
        className="bg-white border border-gray-300 rounded-md px-2 py-1 w-20 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <span className="text-xs text-gray-500 ml-1 whitespace-nowrap">/día</span>
    </div>
  );
};

export default PriceRangeFilter;
