// Explore.jsx
import { useState } from "react";
import CarCard from "../../components/cards/CarCard/CarCard";
import Header from "../../components/header/Header";
import Filters from "../../components/filters/explorefilters/ExploreFilters";
import card1 from "../../assets/images/card1.jpg";
import card2 from "../../assets/images/card2.jpg";
import card3 from "../../assets/images/card3.jpg";

export default function Explore() {
  const allCars = [
    {
      model: "Honda Civic",
      brand: "Honda",
      year: 1985,
      rating: 5.0,
      capacity: 5,
      doors: 4,
      transmission: "A",
      price: 24,
      image: card1
    },
    {
      model: "Picachito nuevo",
      brand: "Ni el sabe",
      year: 1950,
      rating: 0.1,
      capacity: 10,
      doors: 2,
      transmission: "M",
      price: 99,
      image: card2
    },
    {
      model: "Mototaxi",
      brand: "Sepaputas",
      year: 2025,
      rating: 4.5,
      capacity: 4,
      doors: 0,
      transmission: "A",
      price: 1000,
      image: card3
    }
  ];

  const [cars] = useState(allCars);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-gray-900 mb-6">Explorar vehículos</h1>
          <Filters />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cars.map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
}
