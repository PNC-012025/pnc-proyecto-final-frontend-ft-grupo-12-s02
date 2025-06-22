const TransmissionFilter = ( {className} ) => {
  return (
    <select className={className}>
      <option value="">Transmisión</option>
      <option value="A">Automática</option>
      <option value="M">Manual</option>
    </select>
  );
};

export default TransmissionFilter;
