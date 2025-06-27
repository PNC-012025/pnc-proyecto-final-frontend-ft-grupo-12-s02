import React, { useEffect, useState } from "react";
import YearFilter from "../generalfilters/YearFilter";
import BrandFilter from "../generalfilters/BrandFilter";
import ModelFilter from "../generalfilters/ModelFilter";
import TransmissionFilter from "../generalfilters/TransmissionFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import PassengersFilter from "../generalfilters/PassengersFilter";
import Button from "../../button/Button";

const Filters = ({ setFilter }) => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    // Update the filter when the selected brand changes
    setFilter((prevFilter) => ({
      ...prevFilter,
      brand: selectedBrand,
      model: "", // Reset model when brand changes
    }));
  },[selectedBrand, setFilter]);

  const handleOnClick = () => {
    // Reset all filters to their default values
    setFilter({
      year: null,
      brand: "",
      model: "",
      transmission: "",
      passengers: null,
      minPrice: null,
      maxPrice: null,
    });
    setSelectedBrand(""); // Reset selected brand
    setResetKey(prevKey => prevKey + 1); // Increment key to force re-render if needed
  }

  return (
    <div className="bg-white/30 backdrop-blur-md border border-gray-200 rounded-xl px-6 py-4 w-full flex flex-wrap gap-4 items-center justify-between">
      <div className="flex flex-wrap gap-4 items-center">
        <YearFilter setFilter={setFilter} resetKey={resetKey}/>
        <BrandFilter selectedBrand={selectedBrand} onBrandChange={setSelectedBrand} />
        <ModelFilter selectedBrand={selectedBrand} setFilter={setFilter} resetKey={resetKey}/>
        <TransmissionFilter setFilter={setFilter} resetKey={resetKey}/>
        <PassengersFilter setFilter={setFilter} resetKey={resetKey}/>
        <PriceRangeFilter setFilter={setFilter} resetKey={resetKey}/>
      </div>

      <div className="flex gap-2">
        {
          //<Button>Aplicar</Button>
        }
        <Button onClick={handleOnClick}>Reiniciar</Button>
      </div>
    </div>
  );
};

export default Filters;
