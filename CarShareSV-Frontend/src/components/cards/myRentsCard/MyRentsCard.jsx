import { FaUser, FaCar, FaStar } from 'react-icons/fa';
import { GiCarDoor, GiGearStick } from 'react-icons/gi';
import ImageSlider from '../../imageslider/imageslider';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import useReview from '../../../hooks/useReview';

export default function MyRentsCard({ car }) {

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

  return (
    <div className="flex items-stretch space-x-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-[700px] min-h-[310px] h-full">
        <div className="p-6 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start h-full">
            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">{car.brand} {car.model}</h3>
                  <p className="text-gray-600 text-lg">{car.year}</p>
                </div>

                <div className="flex flex-wrap items-center gap-y-5 gap-x-6 text-sm text-gray-600">
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
                    <span>{car.transmission === 'Automatic' ? 'Automático' : 'Manual'}</span>
                  </div>
                </div>

                <div className="flex items-center text-base text-gray-800">
                  <FaStar className="mr-1 text-primary" />
                  <span className="text-sm text-gray-600 mr-2">Calificación:</span>
                  <span className="text-sm">{averageRating ?? "N/A"}</span>
                  <span className="text-sm text-gray-500 ml-1">({carReviews ? carReviews.length : 0} reseñas)</span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <FaUser className="mr-2 text-primary" />
                  <span className="font-medium">{car.username}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600 ">
                  <FaMapMarkerAlt className="mr-2 text-primary" />
                  <span className="text-sm text-gray-600">{car.location}</span>
                </div>
              </div>
            </div>

            <div className="self-center pl-6">
              <ImageSlider images={car.images} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}