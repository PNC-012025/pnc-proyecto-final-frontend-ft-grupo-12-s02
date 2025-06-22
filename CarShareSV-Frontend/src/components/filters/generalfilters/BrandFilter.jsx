const BrandFilter = ({ selectedBrand, onBrandChange, className }) => {
  return (
    <select
      className={className}
      value={selectedBrand}
      onChange={(e) => onBrandChange(e.target.value)}
    >
      <option value="">Marca</option>
      <option value="Toyota">Toyota</option>
      <option value="Hyundai">Hyundai</option>
      <option value="Nissan">Nissan</option>
      <option value="Kia">Kia</option>
      <option value="Chevrolet">Chevrolet</option>
      <option value="Ford">Ford</option>
      <option value="Honda">Honda</option>
      <option value="Mitsubishi">Mitsubishi</option>
      <option value="Suzuki">Suzuki</option>
      <option value="Mazda">Mazda</option>
      <option value="Volkswagen">Volkswagen</option>
      <option value="Mercedes-Benz">Mercedes-Benz</option>
      <option value="BMW">BMW</option>
      <option value="Audi">Audi</option>
      <option value="Isuzu">Isuzu</option>
      <option value="Jeep">Jeep</option>
    </select>
  );
};

export default BrandFilter;
