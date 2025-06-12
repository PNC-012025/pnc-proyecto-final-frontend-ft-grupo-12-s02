const TransmissionFilter = () => {
  return (
    <select className="rounded-lg bg-white/30 backdrop-blur-md border border-black text-lg h-12 px-4 font-light">
      <option value="">Transmisión</option>
      <option value="A">Automática</option>
      <option value="M">Manual</option>
    </select>
  );
};

export default TransmissionFilter;
