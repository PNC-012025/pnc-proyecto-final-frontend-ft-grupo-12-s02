import { useRef, useEffect, useState } from "react";
import { FaStar, FaUser } from "react-icons/fa";
import { GiCarDoor, GiGearStick } from "react-icons/gi";
import useReview from "../../../hooks/useReview";

export default function CarCard({ car, onClick }) {
  const randomIndexRef = useRef(null);
  const { carReviews, getCarReviews } = useReview();
  const [averageRating, setAverageRating] = useState(null);

  useEffect(() => {
    getCarReviews(car.carId);
  }, [car.carId, getCarReviews]);

  useEffect(() => {
    if (carReviews && carReviews.length > 0) {
      const avg =
        carReviews.reduce((sum, review) => sum + (review.rating || 0), 0) /
        carReviews.length;
      setAverageRating(avg.toFixed(1));
    } else {
      setAverageRating(null);
    }
  }, [carReviews]);

  useEffect(() => {
    if (randomIndexRef.current === null || randomIndexRef.current.carId !== car.carId) {
      randomIndexRef.current = {
        carId: car.carId,
        index: Math.floor(Math.random() * (car.images?.length || 1))
      };
    }
  }, [car.carId, car.images]);

  const mainImage =
    Array.isArray(car.images) && car.images.length > 0
      ? car.images[randomIndexRef.current?.index ?? 0]
      : null;

  return (
    <div onClick={onClick} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md hover:scale-[1.01] transition-transform duration-200">
      <img src={mainImage} alt={`${car.brand} ${car.model}`} className="w-full h-55 object-cover" />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">
          {car.brand} <span className="text-gray-500 font-normal"></span>
          {car.model} <span className="text-gray-500 font-normal">{car.year}</span>
        </h3>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <FaStar className="text-primary" /> {averageRating ?? "N/A"}
          </div>
          <div className="flex items-center gap-1">
            <FaUser className="text-primary" /> {car.capacity}
          </div>
          <div className="flex items-center gap-1">
            <GiCarDoor className="text-primary" /> {car.doors}
          </div>
          <div className="flex items-center gap-1">
            <GiGearStick className="text-primary" /> {car.transmission === 'Automatic' ? 'Automático' : 'Manual'}
          </div>
        </div>
        <div className="pt-2 text-base font-semibold text-gray-900">
          ${car.dailyPrice} <span className="text-sm text-gray-500 font-normal">/día</span>
        </div>
      </div>
    </div>
  );
}