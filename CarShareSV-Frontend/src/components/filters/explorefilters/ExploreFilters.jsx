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
    <div className="flex items-center justify-center gap-4 font-light flex-wrap">
      <YearFilter />
      <BrandFilter selectedBrand={selectedBrand} onBrandChange={setSelectedBrand} />
      <ModelFilter selectedBrand={selectedBrand} />
      <TransmissionFilter />
      <PassengersFilter />
      <PriceRangeFilter />
      
      <Button 
        href="submit"
        className="px-4 py-2 whitespace-nowrap rounded-md"
      >
        Aplicar filtros
      </Button>
      
      <Button
        href="submit"
        className="px-4 py-2 whitespace-nowrap rounded-md"
      >
        Reiniciar filtros
      </Button>
    </div>
  );
};


export default Filters;