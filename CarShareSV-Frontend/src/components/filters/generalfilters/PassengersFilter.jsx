const PassengersFilter = ( {className}) => {
  return (
    <select className={className}>
      <option value="">Pasajeros</option>
      <option value="2">2</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="7">7</option>
    </select>
  );
};

export default PassengersFilter;
