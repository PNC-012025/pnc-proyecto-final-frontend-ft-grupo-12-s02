import { FaUser, FaCar, FaStar } from 'react-icons/fa';
import { GiCarDoor, GiGearStick } from 'react-icons/gi';

export default function MyRentsCard({ car }) {
  return (
    <div className="flex items-stretch space-x-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-[700px] min-h-[310px] h-full">
        <div className="p-6 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start h-full">
         
            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">{car.model}</h3>
                  <p className="text-gray-600 text-lg">{car.year}</p>
                </div>

                <div className="flex flex-wrap items-center gap-y-4 gap-x-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FaUser className="mr-2 text-primary" />
                    <span>{car.capacity} pasajeros</span>
                  </div>
                  <div className="flex items-center">
                    <GiCarDoor className="mr-2 text-primary" />
                    <span>{car.doors} puertas</span>
                  </div>
                  <div className="flex items-center">
                    <GiGearStick className="mr-2 text-primary" />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCar className="mr-2 text-primary" />
                    <span>{car.type}</span>
                  </div>
                </div>

                <div className="flex items-center text-base text-gray-800">
                  <span className="text-sm text-gray-600 mr-2">Calificación:</span>
                  <FaStar className="mr-1 text-primary" />
                  <span className="font-medium">{car.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({car.reviewCount} reseñas)</span>
                </div>

                <div className="flex items-center text-sm text-gray-600 pt-2">
                  <FaUser className="mr-2 text-primary" />
                  <span className="font-medium">{car.renterName}</span>
                </div>
              </div>
            </div>

            <div className="ml-6 self-center">
              <img
                src={car.image}
                alt={car.model}
                className="w-80 h-[250px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
