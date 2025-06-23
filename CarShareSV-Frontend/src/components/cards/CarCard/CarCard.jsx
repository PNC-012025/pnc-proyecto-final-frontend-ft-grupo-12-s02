// CarCard.jsx
import { FaStar, FaUser } from "react-icons/fa";
import { GiCarDoor, GiGearStick } from "react-icons/gi";

export default function CarCard({ car }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md hover:scale-[1.01] transition-transform duration-200">
      <img src={car.image} alt={car.model} className="w-full h-55 object-cover" />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">
          {car.model} <span className="text-gray-500 font-normal">{car.year}</span>
        </h3>

        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <FaStar className="text-primary" /> {car.rating}
          </div>
          <div className="flex items-center gap-1">
            <FaUser className="text-primary" /> {car.capacity}
          </div>
          <div className="flex items-center gap-1">
            <GiCarDoor className="text-primary" /> {car.doors}
          </div>
          <div className="flex items-center gap-1">
            <GiGearStick className="text-primary" /> {car.transmission === 'A' ? 'Automático' : 'Manual'}
          </div>
        </div>

        <div className="pt-2 text-base font-semibold text-gray-900">
          ${car.price} <span className="text-sm text-gray-500 font-normal">/día</span>
        </div>
      </div>
    </div>
  );
}
