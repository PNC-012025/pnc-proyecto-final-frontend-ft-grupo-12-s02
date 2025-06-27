import React, { useEffect, useState } from 'react';

const TransmissionFilter = ( {className, setFilter, resetKey} ) => {

  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(""); // Reset value when resetKey changes
  }, [resetKey]);

  const handleChange = (e) => {
    setValue(e.target.value); // Update local state with the selected transmission
    const transmission = e.target.value ? e.target.value : ""; // Set to empty string if no transmission is selected
    setFilter((prevFilter) => ({
      ...prevFilter,
      transmission: transmission,
    }));
  }

  return (
    <select value={value} className={className} onChange={handleChange}>
      <option value="">Transmisión</option>
      <option value="Automatic">Automática</option>
      <option value="Standard">Manual</option>
    </select>
  );
};

export default TransmissionFilter;
