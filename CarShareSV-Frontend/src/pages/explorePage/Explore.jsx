// Explore.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CarCard from "../../components/cards/CarCard/CarCard";
import Header from "../../components/header/Header";
import Filters from "../../components/filters/explorefilters/ExploreFilters";
import useCars from "../../hooks/useCars";

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
    //console.log("CARS: ",  JSON.stringify(cars, null, 2));

    return Array.isArray(cars) ? cars.filter(car => {

      //console.log("Selected Filter: ", JSON.stringify(selectedFilter, null, 2));

      return (
        (selectedFilter.year !== null ? (car.year === selectedFilter.year) : car.year) &&
        (selectedFilter.brand !== "" ? (car.brand === selectedFilter.brand) : car.brand) &&
        (selectedFilter.model !== "" ? (car.model === selectedFilter.model) : car.model) &&
        (selectedFilter.transmission !== "" ? (car.transmission === selectedFilter.transmission) : car.transmission) &&
        (selectedFilter.passengers !== null ? (car.capacity === selectedFilter.passengers) : car.capacity) &&
        (selectedFilter.minPrice !== null ? (car.dailyPrice >= selectedFilter.minPrice) : car.dailyPrice) &&
        (selectedFilter.maxPrice !== null ? (car.dailyPrice <= selectedFilter.maxPrice) : car.dailyPrice)
      );
    }) : [];
  }

  const filteredCars = filterCars(cars).reverse();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
   
      <div className="max-w-6xl mx-auto pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-4xl font-semibold text-gray-900 mb-8">
          Explorar Vehículos Disponibles
          </h2>
          <Filters setFilter={setSelectedFilter}/>
        </div>

        {loading ? <p>Cars Loading...</p> :

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ">
          {filteredCars.map((car, index) => (
            <CarCard key={index} car={car} onClick={() => {
              navigate(`/car/${car.carId || index}`, { state: { car } })
            }
            } />
          ))}
        </div>
        }
      </div>
    </div>
  );
}
