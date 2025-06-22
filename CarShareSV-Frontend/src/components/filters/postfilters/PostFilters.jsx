import React, { useState } from "react";
import BrandFilter from "../generalfilters/BrandFilter";
import ModelFilter from "../generalfilters/ModelFilter";
import YearFilter from "../generalfilters/YearFilter";
import TransmissionFilter from "../generalfilters/TransmissionFilter";
import PassengersFilter from "../generalfilters/PassengersFilter";

const PostFilters = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const commonClass = "rounded-full px-4 py-2 border border-gray-300 w-full max-w-md";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      <div>
        <BrandFilter
          selectedBrand={selectedBrand}
          onBrandChange={setSelectedBrand}
          className={commonClass}
        />
      </div>

      <div>
        <ModelFilter selectedBrand={selectedBrand} className={commonClass} />
      </div>

      <div>
        <YearFilter className={commonClass} />
      </div>

      <div>
        <TransmissionFilter className={commonClass} />
      </div>

      <div>
        <PassengersFilter className={commonClass} />
      </div>

      <div>
        <select className={`${commonClass}`}>
          <option value="">Tipo de vehículo</option>
          <option value="camioneta">Camioneta</option>
          <option value="sedan">Sedán</option>
          <option value="van">Van</option>
          <option value="deportivo">Deportivo</option>
        </select>
      </div>

      <div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          <input
            type="number"
            placeholder="Precio / día"
            className={`${commonClass} pl-7`}
            min="1"
          />
        </div>
      </div>

      <div>
        <select className={`${commonClass}`}>
          <option value="">Número de puertas</option>
          <option value="2">2</option>
          <option value="4">4</option>
        </select>
      </div>
    </div>
  );
};

export default PostFilters;
