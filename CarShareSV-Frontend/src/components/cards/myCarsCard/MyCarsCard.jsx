import { FaUser, FaStar, FaInfoCircle } from 'react-icons/fa';
import { GiCarDoor, GiGearStick } from 'react-icons/gi';
import Button from '../../button/Button';
import useManageCars from '../../../hooks/useManageCars';
import { useEffect, useState } from 'react';
import useReservation from '../../../hooks/useReservation';
import useReview from '../../../hooks/useReview'; 
import { ca } from 'date-fns/locale';
import ImgSlider from '../../imageslider/imageslider';
import Alert from '../../alerts/alert';
import { isSameDay } from 'date-fns';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function MyCarsCard({ car, onDelete }) {
  const mainImage = Array.isArray(car.images) && car.images.length > 0
    ? car.images[0] : null;
  const [visibility, setVisibility] = useState(car.visible);
  const [showConfirm, setShowConfirm] = useState(false);
  const { changeVisibility, deleteCar } = useManageCars();
  const { getCarReservations, carReservations, getCarReservedDates, reservedDates } = useReservation();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [reserved, setReserved] = useState(false);

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
    getCarReservations(car.carId);
    getCarReservedDates(car.carId);
  }, [getCarReservations]);

  useEffect(() => {
    const today = new Date();
    const isReserved = reservedDates.some(date => isSameDay(new Date(date), today));
    setReserved(isReserved);
    //console.log("DATES: ", reservedDates);
    //console.log("NOW: ", today);
  }, [reservedDates]);

  const handleOnClick = () => {
    if (carReservations.length > 0 && car.visible) {
      setAlertMessage("No se puede ocultar el vehículo porque tiene reservas asociadas.");
      setAlertOpen(true);
    } else {
      changeVisibility(car.carId, !car.visible);
      setVisibility(!visibility);
    }
  };
  const handleDeleteClick = () => {
    setShowConfirm(true);
  }

  const handleConfirmDelete = () => {
    if (carReservations.length > 0) {
      setAlertMessage("No se puede eliminar el vehículo porque tiene reservas asociadas.");
      setAlertOpen(true);
    }
    else {
      deleteCar(car.carId);
      onDelete(car.carId);
      setShowConfirm(false);
    }
  }

  const handleCancelDelete = () => {
    setShowConfirm(false);
  }

  const navigate = useNavigate();

  const handleCardClick = (e) => {
    if (e.target.tagName === "BUTTON") return;
    navigate(`/car/${car.carId}`, { state: { car } });
  };

  return (
    <div className="flex items-center space-x-6 cursor-pointer" onClick={handleCardClick}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-[800px]">
        <div className="p-6">
          <div className="flex justify-between items-start">

            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {car.brand} {car.model}
              </h3>
              <p className="text-gray-600 mb-4">{car.year}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4 mt-10">
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

              <div className="flex items-center mb-4 mt-5">
                <FaStar className=" mr-1 text-primary" />
                <span className="text-sm text-gray-600">Calificación:</span>
                <span className="ml-2 text-sm text-gray-600">{averageRating ?? "N/A"}</span>
                <span className="text-sm text-gray-500 ml-1">({carReviews ? carReviews.length : 0} reseñas)</span>
              </div>

              <div className="flex items-center text-sm text-gray-600 mt-5 ">
                  <FaMapMarkerAlt className="mr-1 text-primary" />
                  <span className="ml-1 text-sm text-gray-600">{car.location}</span>
                </div>

              <div className="flex items-center mb-4 mt-5">
                  <FaInfoCircle className="mr-1 text-primary" />
                <span className="text-sm text-gray-600">Estado: </span>
               <span className="ml-3 text-sm text-gray-600">  {reserved ? "Reservado" : "Disponible"} </span>
              </div>

            </div>

            <div className="ml-6">
              <ImgSlider images={car.images} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        {!showConfirm ? (
          <>
            <Button onClick={handleDeleteClick}>
              Eliminar
            </Button>
            <Button
              onClick={handleOnClick}
            >
              {visibility ? "Ocultar" : "Mostrar"}
            </Button>
          </>
        ) : (
          <div className="flex flex-col space-y-2">
            <span className="text-sm text-gray-700">¿Confirmar eliminación?</span>
            <Button onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700">Confirmar</Button>
            <Button onClick={handleCancelDelete} className="bg-gray-300 hover:bg-gray-400 text-gray-800">Cancelar</Button>
          </div>
        )}
      </div>

      <Alert
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        message={alertMessage}
      />
    </div>
  );
}