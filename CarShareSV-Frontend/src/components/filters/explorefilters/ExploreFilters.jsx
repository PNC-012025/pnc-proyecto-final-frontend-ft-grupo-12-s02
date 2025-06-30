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
    setFilter((prevFilter) => ({
      ...prevFilter,
      brand: selectedBrand,
      model: "", 
    }));
  },[selectedBrand, setFilter]);

  const handleOnClick = () => {
    setFilter({
      year: null,
      brand: "",
      model: "",
      transmission: "",
      passengers: null,
      minPrice: null,
      maxPrice: null,
    });   
    setSelectedBrand(""); 
    setResetKey(prevKey => prevKey + 1); 
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
        <div className="mr-8">
          <Button onClick={handleOnClick}>Reiniciar filtros</Button>
        </div>
    </div>
  );
};

export default Filters;
