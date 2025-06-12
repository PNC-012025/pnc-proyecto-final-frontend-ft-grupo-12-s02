import { useState } from "react";
import CarCard from "../../components/card/CarCard";
import Header from "../../components/header/Header";
import Filters from "../../components/filters/Filters";

export default function Explore() {
  const allCars = [
    {
      model: "Kia Soul",
      brand: "Kia",
      year: 2016,
      rating: 4.8,
      capacity: 5,
      doors: 4,
      transmission: "A",
      price: 17,
      image: "https://i.imgur.com/7YARv8z.png"
    },
    {
      model: "Kia Soul",
      brand: "Kia",
      year: 2016,
      rating: 4.8,
      capacity: 5,
      doors: 4,
      transmission: "M",
      price: 17,
      image: "https://i.imgur.com/qbR6J4Z.png"
    },
    {
      model: "Kia Soul",
      brand: "Kia",
      year: 2016,
      rating: 4.8,
      capacity: 5,
      doors: 4,
      transmission: "M",
      price: 17,
      image: "https://i.imgur.com/xzBvI8z.png"
    }
  ];

  const [cars] = useState(allCars);

  return (
    <div className="min-h-screen font-light bg-gradient-to-b from-pink-200 via-white to-indigo-200">
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
