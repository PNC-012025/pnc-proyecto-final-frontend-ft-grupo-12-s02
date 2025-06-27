import React, { useEffect, useState } from 'react';

const PassengersFilter = ( {className, setFilter, resetKey}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(""); // Reset value when resetKey changes
  }, [resetKey]);

  const handleChange = (e) => {
    setValue(e.target.value); // Update local state with the selected number of passengers
    const passengers = e.target.value ? parseInt(e.target.value) : null; // Set to null if no passengers are selected
    setFilter((prevFilter) => ({  
      ...prevFilter,
      passengers: passengers,
    }));
  }

  return (
    <select value={value} className={className} onChange={handleChange}>
      <option value="">Pasajeros</option>
      <option value="2">2</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="7">7</option>
    </select>
  );
};

export default PassengersFilter;
