import React, { useState } from "react";
import YearFilter from "../generalfilters/YearFilter";
import BrandFilter from "../generalfilters/BrandFilter";
import ModelFilter from "../generalfilters/ModelFilter";
import TransmissionFilter from "../generalfilters/TransmissionFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import PassengersFilter from "../generalfilters/PassengersFilter";
import Button from "../../button/Button";

const Filters = () => {
  const [selectedBrand, setSelectedBrand] = useState("");

  return (
    <div className="bg-white/30 backdrop-blur-md border border-gray-200 rounded-xl px-6 py-4 w-full flex flex-wrap gap-4 items-center justify-between">
      <div className="flex flex-wrap gap-4 items-center">
        <YearFilter />
        <BrandFilter selectedBrand={selectedBrand} onBrandChange={setSelectedBrand} />
        <ModelFilter selectedBrand={selectedBrand} />
        <TransmissionFilter />
        <PassengersFilter />
        <PriceRangeFilter />
      </div>

      <div className="flex gap-2">
        <Button>Aplicar</Button>
        <Button>Reiniciar</Button>
      </div>
    </div>
  );
};

export default Filters;
