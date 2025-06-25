const PassengersFilter = ( {className, setFilter}) => {

  const handleChange = (e) => {
    const passengers = e.target.value ? parseInt(e.target.value) : null; // Set to null if no passengers are selected
    setFilter((prevFilter) => ({  
      ...prevFilter,
      passengers: passengers,
    }));
  }

  return (
    <select className={className} onChange={handleChange}>
      <option value="">Pasajeros</option>
      <option value="2">2</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="7">7</option>
    </select>
  );
};

export default PassengersFilter;
