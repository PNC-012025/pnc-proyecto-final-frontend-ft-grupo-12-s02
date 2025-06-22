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
      image: card1    },
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
    <div className="min-h-screen font-light bg-gradient-to-b from-pink-200 via-white">
      <Header />
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-6 space-y-20">
        <h2 className="text-2xl font-semibold"></h2>

        <Filters />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cars.map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
}
