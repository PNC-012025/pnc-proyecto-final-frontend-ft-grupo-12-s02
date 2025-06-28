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
//import card1 from "../../assets/images/card1.jpg";


function formatDate(date) {
    return new Date(date).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default function CarDetails() {
    const location = useLocation();
    const car = location.state?.car;
    const { createReservation, getCarReservedDates, reservedDates, isLoading, hasError } = useReservation();
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
      getCarReservedDates(car.id);
    }, [getCarReservedDates]);

    //console.log("Car Details: ", car);
    const [range, setRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    });

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
        createReservation(reservationDetails);
        setAlertMessage("Reserva publicada con éxito.");
        setAlertOpen(true);
    } catch (error) {
        console.error("Error al crear la reserva:", error);
        setAlertMessage("Error al crear la reserva. Inténtalo de nuevo más tarde.");
        setAlertOpen(true);
    }};

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-6xl mx-auto pt-25 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Columna izquierda */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Card del carro */}
                        <MyRentsCard car={car} />

                        {/* Calendario + resumen */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row gap-6 items-center md:items-stretch">
                            {/* Calendario más pequeño */}
                            <div className="scale-[0.9] -ml-4">
                                <h3 className="text-base font-medium text-gray-900 mb-2">Elige tu fecha de reservación:</h3>
                                <DateRange
                                    ranges={[range]}
                                    onChange={handleSelect}
                                    moveRangeOnFirstSelection={false}
                                    minDate={new Date()}
                                    locale={es}
                                    rangeColors={["#d1285e"]}
                                />
                            </div>

                            {/* Texto centrado verticalmente */}
                            <div className="flex-1 flex flex-col justify-center space-y-8 text-sm text-gray-700">
                                <div className="flex items-center gap-2 text-primary font-medium">
                                    <FaMapMarkerAlt />
                                    {car.location}
                                </div>
                                <div>
                                    <p><span className="font-semibold">Reserva:</span> {formatDate(range.startDate)} - {formatDate(range.endDate)}</p>
                                </div>
                                <div>
                                    <p><span className="font-semibold">Días totales:</span> {totalDays}</p>
                                </div>
                            </div>
                        </div>


                        {/* Descripción */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Descripción:</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{car.description}</p>
                        </div>
                    </div>

                    {/* Columna derecha - Detalle de precio */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">${car.dailyPrice} <span className="text-sm text-gray-600"> al día</span></h3>
                            <ul className="text-sm text-gray-700 mb-6 space-y-1">
                                <li>- Cancelación gratis antes de la fecha de reservación</li>
                                <li>- Pago al recoger el vehículo</li>
                                <li>- Reserve sin necesidad de tarjeta de crédito</li>
                            </ul>

                            <hr className="my-4" />
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
                                <hr className="border-gray-200" />
                                <div className="flex justify-between font-semibold text-black">
                                    <span>Total:</span>
                                    <span></span>
                                </div>
                                <div className="flex justify-between text-gray-600 font-semibold">
                                    <span>Pagar al recoger:</span>
                                    <span></span>
                                </div>
                                <div className="flex justify-between text-gray-600 font-semibold">
                                    <span>Pagar ahorita:</span>
                                    <span>${total}</span>
                                </div>
                            </div>

                            <Button className="w-full mt-4"
                                onClick={handleCarDetails}>
                                Reservar
                            </Button>
                        </div>
                    </div>
                </div>
                <Alert
                    message={alertMessage}
                    isOpen={alertOpen}
                    onClose={() => setAlertOpen(false)}
                />
            </div>
        </div>
    );
}
