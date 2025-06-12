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
    <div className="flex flex-col md:flex-row gap-4 items-center font-light">
      <YearFilter />
      <BrandFilter selectedBrand={selectedBrand} onBrandChange={setSelectedBrand} />
      <ModelFilter selectedBrand={selectedBrand} />
      <TransmissionFilter />
      <PassengersFilter />
      <PriceRangeFilter />
      <div className="flex flex-row flex-wrap gap-4 items-center font-semibold">
  <Button 
  href="submit"
  className="min-w-[150px] whitespace-nowrap bg-pink-600 border-pink-600 hover:text-pink-600 hover:border-pink-600">
    Aplicar filtros
  </Button>
  <Button
  href="submit"
  className="min-w-[150px] whitespace-nowrap text-pink-600 border-pink-600 hover:bg-pink-600 hover:border-pink-600">
    Reiniciar filtros
  </Button>
</div>

    </div>
  );
};

export default Filters;
