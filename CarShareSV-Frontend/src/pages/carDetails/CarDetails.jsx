import { FaMapMarkerAlt } from 'react-icons/fa';
import Header from "../../components/header/Header";
import MyRentsCard from "../../components/cards/myRentsCard/MyRentsCard";
import Button from "../../components/button/Button";
import { useState } from "react";
import { DateRange } from "react-date-range";
import { es } from "date-fns/locale";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import card1 from "../../assets/images/card1.jpg";


function formatDate(date) {
    return new Date(date).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default function CarDetails() {
    const car = {
        id: '1',
        model: 'Kia Soul',
        year: 2016,
        capacity: 5,
        doors: 4,
        transmission: 'Automático',
        type: 'SUV',
        rating: 4.8,
        reviewCount: 3,
        renterName: 'Diego Calvo',
        image: card1,
        description:
            'Padre nuestro que estás en el cielo, santificado sea tu nombre; venga a nosotros tu reino; hágase tu voluntad, en la tierra como en el cielo. Danos hoy nuestro pan de cada día; perdona nuestras ofensas como también nosotros perdonamos a los que nos ofenden; no nos dejes caer en la tentación, y líbranos del mal. Amén.',
        dailyRate: 17,
        serviceFee: 2.0,
        address: 'Calle El Mirador y 85a Ave Norte 648, San Salvador, El Salvador',
    };

    const [range, setRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    });

    const handleSelect = (ranges) => {
        setRange(ranges.selection);
    };

    const totalDays = Math.ceil((range.endDate - range.startDate) / (1000 * 60 * 60 * 24)) + 1;
    const rentalCost = totalDays * car.dailyRate;
    const total = rentalCost + car.serviceFee;

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
                                    {car.address}
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
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">$17 <span className="text-sm text-gray-600">al día</span></h3>
                            <ul className="text-sm text-gray-700 mb-6 space-y-1">
                                <li>- Cancelación gratis antes de la fecha de reservación</li>
                                <li>- Pago al recoger el vehículo</li>
                                <li>- Reserve sin necesidad de tarjeta de crédito</li>
                            </ul>

                            <hr className="my-4" />
                            <h4 className="font-semibold mb-3 text-gray-900">Detalle de precio:</h4>
                            <div className="space-y-2 text-sm text-gray-700 mb-4">
                                <div className="flex justify-between">
                                    <span>Tarifa de servicio / día:</span>
                                    <span>${car.dailyRate.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tarifa de alquiler * {totalDays} días:</span>
                                    <span>${rentalCost.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tarifa de servicio:</span>
                                    <span>${car.serviceFee.toFixed(2)}</span>
                                </div>
                                <hr className="border-gray-200" />
                                <div className="flex justify-between font-semibold text-black">
                                    <span>Total:</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Pagar al recoger:</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Pagar ahorita:</span>
                                    <span>$0.00</span>
                                </div>
                            </div>

                            <Button className="w-full mt-4">
                                Reservar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
