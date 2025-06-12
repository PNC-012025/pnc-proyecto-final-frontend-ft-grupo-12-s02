const PassengersFilter = () => {
  return (
    <select className="rounded-lg bg-white/30 backdrop-blur-md border border-black text-lg h-12 px-4 font-light">
      <option value="">Pasajeros</option>
      <option value="2">2</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="7">7</option>
    </select>
  );
};

export default PassengersFilter;
