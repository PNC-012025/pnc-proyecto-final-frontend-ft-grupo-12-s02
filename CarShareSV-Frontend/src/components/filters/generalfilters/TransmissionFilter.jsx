import React, { useEffect, useState } from 'react';

const TransmissionFilter = ( {className, setFilter, resetKey} ) => {

  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(""); 
  }, [resetKey]);

  const handleChange = (e) => {
    setValue(e.target.value); 
    const transmission = e.target.value ? e.target.value : ""; 
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
