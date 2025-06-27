// Explore.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CarCard from "../../components/cards/CarCard/CarCard";
import Header from "../../components/header/Header";
import Filters from "../../components/filters/explorefilters/ExploreFilters";
import useCars from "../../hooks/useCars";
/* import card1 from "../../assets/images/card1.jpg";
import card2 from "../../assets/images/card2.jpg";
import card3 from "../../assets/images/card3.jpg";
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
]; */

export default function Explore() {

  const { loading, getVisibleCars, cars } = useCars();
  const [selectedFilter, setSelectedFilter] = useState({
    year: null,
    brand: "",
    model: "",
    transmission: "",
    passengers: null,
    minPrice: null,
    maxPrice: null
  });
  const navigate = useNavigate();

  //  const [cars] = useState(allCars);

  useEffect(() => {
    getVisibleCars();
  }, [getVisibleCars]);

  const filterCars = (cars) => {
    return cars.filter(car => {
      return (
        (selectedFilter.year !== null ? (car.year === selectedFilter.year) : car.year) &&
        (selectedFilter.brand !== "" ? (car.brand === selectedFilter.brand) : car.brand) &&
        (selectedFilter.model !== "" ? (car.model === selectedFilter.model) : car.model) &&
        (selectedFilter.transmission !== "" ? (car.transmission === selectedFilter.transmission) : car.transmission) &&
        (selectedFilter.passengers !== null ? (car.capacity === selectedFilter.passengers) : car.capacity) &&
        (selectedFilter.minPrice !== null ? (car.dailyPrice >= selectedFilter.minPrice) : car.dailyPrice) &&
        (selectedFilter.maxPrice !== null ? (car.dailyPrice <= selectedFilter.maxPrice) : car.dailyPrice)
      );
    })
  }

  const filteredCars = filterCars(cars);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
   
      <div className="max-w-6xl mx-auto pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-gray-900 mb-6">Explorar vehículos</h1>
          <Filters setFilter={setSelectedFilter}/>
        </div>

        {loading ? <p>Cars Loading...</p> :

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredCars.map((car, index) => (
            <CarCard key={index} car={car} onClick={() => navigate(`/car-details/${car.carId || index}`, { state: { car } })} />
          ))}
        </div>
        }
      </div>
    </div>
  );
}
