import { FaUser, FaCar, FaStar } from 'react-icons/fa';
import { GiCarDoor, GiGearStick } from 'react-icons/gi';
import Button from '../../button/Button';

export default function MyCarsCard({car}) {

  return (
   
    <div className="flex items-center space-x-6"> 
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-[650px]"> 
        <div className="p-6">
          <div className="flex justify-between items-start">
  
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {car.model}
              </h3>
              <p className="text-gray-600 mb-4">{car.year}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <FaUser className="mr-1 text-primary" />
                  <span>{car.capacity} pasajeros</span>
                </div>
                <div className="flex items-center">
                  <GiCarDoor className="mr-1 text-primary" />
                  <span>{car.doors} puertas</span>
                </div>
                <div className="flex items-center">
                  <GiGearStick className="mr-1 text-primary" />
                  <span>{car.transmission}</span>
                </div>
                <div className="flex items-center">
                <FaCar className="mr-1 text-primary" /> 
                <span>{car.type}</span> 
              </div>
              </div>

              <div className="flex items-center mb-4">
                <span className="text-sm text-gray-600">Calificación:</span>
                <FaStar className="ml-2 mr-1 text-primary" />
                <span className="font-medium text-gray-900">{car.rating}</span>
                <span className="text-sm text-gray-500 ml-1">({car.reviewCount} reseñas)</span>
              </div>

              <div className="text-sm text-gray-600">
                <span className="font-medium">Estado: </span>
                {car.status === 'rented' && car.renterName && car.rentalPeriod ? (
                  <span>Rentado por {car.renterName} {car.rentalPeriod}</span>
                ) : (
                  <span>{car.status}</span>
                )}
              </div>
            </div>

            <div className="ml-6">
              <img 
                src={car.image} 
                alt={car.model}
                className="w-56 h-40 object-cover rounded-lg" 
              />
            </div>
          </div>
        </div>
      </div>

      
      <div className="flex flex-col space-y-3"> 
        <Button > 
          Eliminar
        </Button>
        <Button > 
          Editar
        </Button>
      </div>
    </div>
  );
}