import { FaStar, FaUser} from "react-icons/fa";
import { GiCarDoor } from "react-icons/gi";
import { GiGearStick } from "react-icons/gi";

export default function CarCard({ car }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-3 w-full max-w-xs duration-500 hover:scale-115">
      <img src={car.image} alt={car.model} className="rounded-md h-40 w-full object-cover" />
      <h2 className="text-lg font-semibold mt-2">{car.model} {car.year}</h2>
      <div className="flex flex-wrap items-center gap-2 text-pink-600 text-sm mt-1">
        <FaStar /><span>{car.rating}</span>
        <FaUser /><span>{car.capacity}</span>
        <GiCarDoor /><span>{car.doors}</span>
        <GiGearStick /><span>{car.transmission}</span>
      </div>
      <div className="mt-2 font-bold text-base">
        ${car.price} <span className="text-sm font-normal text-gray-500">/día</span>
      </div>
    </div>
  );
}
