import Header from '../../components/header/Header';
import MyRentsCard from '../../components/cards/myRentsCard/MyRentsCard';
import { useState, useEffect } from 'react';
import PastDetailCard from '../../components/cards/pastDetailCard/PastDetailCard';
import RentsSwitcher from '../../components/rentsSwitcher/RentsSwitcher';
import useReservation from '../../hooks/useReservation';
import useUser from '../../hooks/useUser';

export default function PastRents() {

    /* 
    [
        {
            "startDate": "2025-06-28",
            "endDate": "2025-06-28",
            "address": "Residencial Las Lomas, C. Los Girasoles, San Salvador",
            "total": 95.0,
            "status": "ACTIVE",
            "reservingUsername": "YiToun",
            "reservedCar": {
                "carId": "3cc3e231-e98a-47f9-bdfd-baac800861c0",
                "plateNumber": "P901906",
                "description": "Tahoe 2019 de agencia, asientos de cuero, Tres filas de asientos, 4 capitan y tercera fila que se adapta y extiende baul.",
                "visible": true,
                "doors": 4,
                "capacity": 7,
                "dailyPrice": 95.0,
                "location": "Residencial Las Lomas, C. Los Girasoles, San Salvador",
                "year": 2019,
                "username": "Mario45",
                "model": "Tahoe",
                "brand": "Chevrolet",
                "transmission": "Automatic",
                "images": [
                    "https://res.cloudinary.com/dqntcutk6/image/upload/v1751071811/carsharesv/cwboo1rmwh3ty1qk2hck.png",
                    "https://res.cloudinary.com/dqntcutk6/image/upload/v1751071812/carsharesv/jk4zlklrsqknt417zitk.png",
                    "https://res.cloudinary.com/dqntcutk6/image/upload/v1751071814/carsharesv/wpoha5iwoqoy2oxmtx0a.png",
                    "https://res.cloudinary.com/dqntcutk6/image/upload/v1751071815/carsharesv/t6hb5fpv37aq8s9xy21d.png",
                    "https://res.cloudinary.com/dqntcutk6/image/upload/v1751071816/carsharesv/ytv67shhnoh5vtktq7jz.png",
                    "https://res.cloudinary.com/dqntcutk6/image/upload/v1751071818/carsharesv/fxcgq0c7ugbbqnkool00.png"
                ]
            } */

    const { user } = useUser();
    const { userReservations, getUserReservations } = useReservation();
    const [finishedReservations, setFinishedReservations] = useState([]);

    useEffect(() => {
        if (user && user.userId) {
            getUserReservations(user.userId);

            setFinishedReservations(userReservations.filter(r => r.status === 'FINISHED'));
        }

        console.log("Finished Reservations: ", finishedReservations);
    }, [user, getUserReservations]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-6xl mx-auto pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-semibold text-gray-900 mb-8">Mis rentas pasadas </h1>

                <RentsSwitcher />

                <div className="space-y-10">
                    {finishedReservations.map((finishedReservation) => (
                        <div key={finishedReservation.reserverCar.carId} className="flex justify-between items-start gap-6">
                            <div className='flex-1'>
                                <MyRentsCard car={finishedReservation.reservedCar} />
                            </div>

                        </div>

                    ))}

                </div>

            </div>
        </div>
    );
}


/*

import Header from '../../components/header/Header';
import MyRentsCard from '../../components/cards/myRentsCard/MyRentsCard';
import CurrentDetailCard from '../../components/cards/currentDetailCard/CurrentDetailCard';
import RentsSwitcher from '../../components/rentsSwitcher/RentsSwitcher';

export default function ActualRents() {
    // Aquí obtienes las reservas activas (ajusta según tu lógica real)
    const reservations = location.state?.activeReservations || [];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-6xl mx-auto pt-28 pb-16 px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-semibold text-gray-900 mb-12">
                    Mis rentas activas
                </h2>
                <RentsSwitcher />

                <div className="space-y-10">
                    {reservations.map((reservation) => (
                        <div key={reservation.reservedCar.carId} className="flex justify-between items-start gap-6">
                            <div className="flex-1">
                                
                                <MyRentsCard car={reservation.reservedCar} />
                                
                                <div className="mt-2 text-sm text-gray-700">
                                    <div><b>Reserva:</b> {reservation.startDate} - {reservation.endDate}</div>
                                    <div><b>Dirección:</b> {reservation.address}</div>
                                    <div><b>Total:</b> ${reservation.total}</div>
                                </div>
                            </div>
                            <CurrentDetailCard car={reservation.reservedCar} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

*/