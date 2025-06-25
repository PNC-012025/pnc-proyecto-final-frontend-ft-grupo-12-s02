const TransmissionFilter = ( {className, setFilter} ) => {

  const handleChange = (e) => {
    const transmission = e.target.value ? e.target.value : ""; // Set to empty string if no transmission is selected
    setFilter((prevFilter) => ({
      ...prevFilter,
      transmission: transmission,
    }));
  }

  return (
    <select className={className} onChange={handleChange}>
      <option value="">Transmisión</option>
      <option value="A">Automática</option>
      <option value="M">Manual</option>
    </select>
  );
};

export default TransmissionFilter;
