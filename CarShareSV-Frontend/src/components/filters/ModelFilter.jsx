import { useState } from "react";

const modelsByBrand = {
  Toyota: ["Corolla", "Yaris", "RAV4", "Hilux", "Land Cruiser", "4Runner", "Fortuner", "Corolla Cross", "Tacoma" ],
  Hyundai: ["Tucson", "Elantra", "Santa Fe", "Kona", "Creta", "Accent", "Venue"],
  Nissan: ["Sentra", "X-Trail", "Patrol", "Versa", "Kicks", "Juke", "Qashqai", "Pathfinder", "Murano", "Rogue", "Frontier"],
  Kia: ["Soul", "Sportage", "Sorento", "Rio", "Seltos", "Picanto", "Forte"],
  Chevrolet: ["Aveo", "Sonic", "Silverado", "Tracker", "Equinox", "Trailblazer", "Captiva", "Tahoe", "Suburban", "Colorado", "Blazer", "Traverse", "Spark", "Trax"],
  Ford: ["Focus", "Explorer", "F-150", "Escape", "Ranger", "Edge", "Bronco", "Fiesta", "EcoSport"],
  Honda: ["Civic", "Accord", "CR-V", "HR-V", "Fit", "Pilot", "Ridgeline", "Odyssey" ],
  Mitsubishi: ["Lancer", "Outlander", "Montero", "Outlander Sport", "Eclipse Cross", "ASX", "Mirage", "L200"],
  Suzuki: ["Swift", "Vitara", "Baleno", "S-Cross", "Jimny"],
  Mazda: ["3", "6", "CX-5", "CX-30", "MX-5", "CX-9", "CX-3", "CX-30"],
  Volkswagen: ["Golf", "Jetta", "Tiguan", "Passat", "Teramont", "T-Cross", "Taos", "Amarok", "Virtus", "Nivus"],
  "Mercedes-Benz": ["C-Class", "E-Class", "GLA", "GLC", "GLE", "A-Class", "CLA", "S-Class", "GLS", "G-Class", "AMG GT", "A45", "C43", "E53"],
  BMW: ["X2", "X3", "X5", "X1", "X4", "X6", "X7", "230i", "235i"],
  Audi: ["A3", "A4", "Q5", "Q2", "Q3", "A6", "Q7",],
  Isuzu: ["D-Max", "MU-X"],
  Jeep: ["Wrangler", "Cherokee", "Compass", "Renegade", "Grand Cherokee", "Gladiator", "Patriot"],
};

const ModelFilter = ({ selectedBrand }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    if (!selectedBrand) setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <select
        className="rounded-lg bg-white/30 backdrop-blur-md border border-black text-lg h-12 px-4 font-light disabled:cursor-not-allowed"
        disabled={!selectedBrand}
      >
        <option value="">Modelo</option>
        {selectedBrand &&
          modelsByBrand[selectedBrand].map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
      </select>

      {/* Tooltip visible si no hay marca seleccionada */}
      {!selectedBrand && showTooltip && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-3 py-1 text-sm text-white bg-red-600 rounded shadow-md whitespace-nowrap z-50">
          No has seleccionado marca
        </div>
      )}
    </div>
  );
};

export default ModelFilter;
