import { FaUser, FaStar } from 'react-icons/fa';
import { GiCarDoor, GiGearStick } from 'react-icons/gi';
import Button from '../../button/Button';
import useManageCars from '../../../hooks/useManageCars';
import { useEffect, useState } from 'react';
import useReservation from '../../../hooks/useReservation';
import { ca } from 'date-fns/locale';
import ImgSlider from '../../imageslider/imageslider';
import Alert from '../../alerts/alert';

export default function MyCarsCard({ car, onDelete }) {
  const mainImage = Array.isArray(car.images) && car.images.length > 0
    ? car.images[0] : null;
  const [visibility, setVisibility] = useState(car.visible);
  const [showConfirm, setShowConfirm] = useState(false); // Nuevo estado
  const { changeVisibility, deleteCar } = useManageCars();
  const { getCarReservations, carReservations } = useReservation();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");


  useEffect(() => {
    getCarReservations(car.carId);
  }, [getCarReservations]);

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

  return (
    <div className="flex items-center space-x-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-[800px]">
        <div className="p-6">
          <div className="flex justify-between items-start">

            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {car.brand} {car.model}
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
                  <span>{car.transmission === 'Automatic' ? 'Automático' : 'Manual'}</span>
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
                {car.status === 'rented' && car.reservingUsername && car.reservedDates ? (
                  <span>Rentado por {car.reservingUsername} {car.rentalPeriod}</span>
                ) : (
                  <span>{car.status}</span>
                )}
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