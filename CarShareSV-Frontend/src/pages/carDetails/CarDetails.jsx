import { FaMapMarkerAlt } from 'react-icons/fa';
import Header from "../../components/header/Header";
import MyRentsCard from "../../components/cards/myRentsCard/MyRentsCard";
import Button from "../../components/button/Button";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { ca, es } from "date-fns/locale";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Alert from "../../components/alerts/alert";
import { useLocation } from "react-router-dom";
import useReservation from '../../hooks/useReservation';
import ImageSlider from '../../components/imageslider/imageslider';
import useReview from '../../hooks/useReview';
import ReviewCard from '../../components/carReviews/reviewCard';
import { FaStar } from 'react-icons/fa';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import useManageCars from '../../hooks/useManageCars';
import { deleteCar as deleteCarService } from "../../services/car.service";
import { useNavigate } from 'react-router-dom';

function formatDate(date) {
    return new Date(date).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default function CarDetails() {

    const { user } = useContext(UserContext);
    const { deleteCar, changeVisibility, isLoading: isLoadingManage } = useManageCars();
    const { createReservation, getCarReservedDates, reservedDates, isLoading: isLoadingReservation, hasError } = useReservation();
    const { carReviews, getCarReviews, isLoading: loadingReviews } = useReview();
    const location = useLocation();
    const car = location.state?.car;
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const navigate = useNavigate();
    const [redirectOnClose, setRedirectOnClose] = useState(false);

    useEffect(() => {
        getCarReservedDates(car.carId);
        getCarReviews(car.carId);
    }, [getCarReservedDates, getCarReviews, car.carId]);

    const [range, setRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    });

    const averageRating =
        carReviews && carReviews.length > 0
            ? (
                carReviews.reduce((sum, review) => sum + (review.rating || 0), 0) /
                carReviews.length
            ).toFixed(1)
            : null;

    const handleSelect = (ranges) => {
        setRange(ranges.selection);
        console.log(reservedDates ? reservedDates : "No hay fechas reservadas");
    };

    const totalDays = Math.ceil((range.endDate - range.startDate) / (1000 * 60 * 60 * 24)) + 1;
    const rentalCost = totalDays * car.dailyPrice;
    const serviceFee = rentalCost * 0.1;
    const total = rentalCost + serviceFee;

    const handleCarDetails = async () => {
        try {
            const reservationDetails = {
                startDate: range.startDate.toISOString().split('T')[0],
                endDate: range.endDate.toISOString().split('T')[0],
                address: car.location,
                carPlateNumber: car.plateNumber
            }
            console.log("Reservation Details: ", reservationDetails);
            const result = await createReservation(reservationDetails);

            if (result.success) {
                setAlertMessage("Reserva realizada con éxito.");
            } else {
                setAlertMessage("Error al crear la reserva. Inténtalo de nuevo más tarde.");
            }
            setAlertOpen(true);
        } catch (error) {
            setAlertMessage("Error al crear la reserva. Inténtalo de nuevo más tarde.");
            setAlertOpen(true);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-6xl mx-auto pt-25 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 
                    <div className="lg:col-span-2 space-y-6">
                    
                        <MyRentsCard car={car} />

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row gap-6 items-center md:items-stretch">
        
                            <div className="scale-[0.9] -ml-4">
                                <h3 className="text-base font-medium text-gray-900 mb-2">Elige tu fecha de reservación:</h3>
                                <DateRange
                                    ranges={[range]}
                                    onChange={handleSelect}
                                    moveRangeOnFirstSelection={false}
                                    minDate={new Date()}
                                    locale={es}
                                    rangeColors={["#d1285e"]}
                                    disabledDates={reservedDates ? reservedDates.map(dateStr => new Date(dateStr)) : []}
                                />
                            </div>

                            <div className="flex-1 flex flex-col justify-center space-y-8 text-sm text-gray-700">
                                <div>
                                    <p><span className="font-semibold">Ubicación :</span> {car.location}</p>
                                </div>
                                <div>
                                    <p><span className="font-semibold">Reserva:</span> {formatDate(range.startDate)} - {formatDate(range.endDate)}</p>
                                </div>
                                <div>
                                    <p><span className="font-semibold">Días totales:</span> {totalDays}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Descripción:</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{car.description}</p>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">${car.dailyPrice} <span className="text-sm text-gray-600"> al día</span></h3>
                            <ul className="text-sm text-gray-700 mb-6 space-y-1">
                                <li>- Cancelación gratis antes de la fecha de reservación</li>
                                <li>- Pago al recoger el vehículo</li>
                                <li>- Reserve sin necesidad de tarjeta de crédito</li>
                            </ul>

                             <div className="border-t border-gray-200 my-5"></div>
                            <h4 className="font-semibold mb-3 text-gray-900">Detalle de precio:</h4>
                            <div className="space-y-2 text-sm text-gray-700 mb-4">
                                <div className="flex justify-between">
                                    <span>Tarifa de servicio / día: ${car.dailyPrice}</span>
                                    <span></span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tarifa de alquiler  días: ${totalDays}</span>
                                    <span></span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tarifa por {totalDays} días: ${rentalCost}</span>
                                    <span></span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tarifa de servicio: ${serviceFee.toFixed(2)}</span>
                                    <span></span>
                                </div>
                                 <div className="border-t border-gray-200 my-5"></div>
                                <div className="flex justify-between font-semibold text-black">
                                    <span>Total:</span>
                                    <span>${total}</span>
                                </div>
                            </div>

                            <Button className="w-full mt-4"
                                onClick={handleCarDetails}>
                                Reservar
                            </Button>
                            <Button
                                className="w-full mt-4"
                                onClick={() => {
                                    const message = `Hola, estoy interesado en reservar tu ${car.brand} ${car.model} ${car.year}, ubicado en ${car.location}. Me gustaría rentarlo desde el ${formatDate(range.startDate)} hasta el ${formatDate(range.endDate)}. Veo que el total a pagar es $${total.toFixed(2)}. ¿Podrías confirmarme si está disponible?`;
                                    const url = `https://web.whatsapp.com/send?phone=${car.phoneNumber}&text=${encodeURIComponent(message)}`;
                                    window.open(url, '_blank');
                                }}
                            >
                                Contactar
                            </Button>

                            <hr className='mt-6 text-gray-500'></hr>

                            {(user?.roles?.includes("ROLE_ADMIN") || user?.roles?.includes("ROLE_SYSADMIN")) && (
                                <div className="flex flex-col gap-2 mt-6">
                                    <h3 className='text-sm font-semibold'>Funciones de Administrador</h3>
                                    <Button
                                        className="w-full"
                                        onClick={async () => {
                                            try {
                                                await deleteCarService(car.carId, user.token);
                                                setAlertMessage("Vehículo eliminado correctamente.");
                                            } catch (e) {
                                                const msg = e.message?.toLowerCase();
                                                if (msg && (msg.includes("reserva") || msg.includes("referida") || msg.includes("constraint"))) {
                                                    setAlertMessage("No se puede eliminar el vehículo porque tiene reservas asociadas.");
                                                } else if (e.message && e.message !== "Error en deleteCar: ") {
                                                    setAlertMessage(e.message);
                                                } else {
                                                    setAlertMessage("Error al eliminar el vehículo. Ya cuenta con reservas asociadas");
                                                }
                                            }
                                            setAlertOpen(true);
                                        }}
                                        disabled={isLoadingManage}
                                    >
                                        Eliminar vehículo
                                    </Button>
                                    <Button
                                        className="w-full"
                                        onClick={async () => {
                                            try {
                                                await changeVisibility(car.carId, !car.visible);
                                                setAlertMessage(
                                                    car.visible
                                                        ? "Vehículo ocultado correctamente."
                                                        : "Vehículo hecho visible correctamente."
                                                );
                                                if (car.visible) setRedirectOnClose(true);
                                            } catch (e) {
                                                setAlertMessage("Error al cambiar la visibilidad.");
                                            }
                                            setAlertOpen(true);
                                        }}
                                        disabled={isLoadingManage}
                                    >
                                        {car.visible ? "Ocultar vehículo" : "Hacer visible"}
                                    </Button>
                                </div>
                            )}


                        </div>
                    </div>
                </div>
                 <div className="border-t border-gray-200 my-8"></div>
                <div className="mt-5">
                    <h3 className="text-2xl font-semibold mb-4">Reseñas del vehículo</h3>
                    {averageRating && (
                        <div className="flex items-center mb-4">
                            <span className='mr-2'><FaStar className="text-primary text-xl" /></span>
                            <span className="font-semibold text-gray-800">{averageRating} / 5</span>
                            <span className="ml-2 text-gray-500 text-sm">({carReviews.length} reseñas)</span>
                        </div>
                    )}
                    {loadingReviews ? (
                        <p>Cargando reseñas...</p>
                    ) : carReviews && carReviews.length > 0 ? (
                        carReviews.map((review, idx) => (
                            <ReviewCard key={idx} review={review} />
                        ))
                    ) : (
                        <p>No hay reseñas para este vehículo.</p>
                    )}
                </div>

                <Alert
                    message={alertMessage}
                    isOpen={alertOpen}
                    onClose={() => {
                        setAlertOpen(false);
                        if (redirectOnClose) {
                            navigate("/explore");
                        }
                    }}
                />

            </div>
        </div>
    );
}
