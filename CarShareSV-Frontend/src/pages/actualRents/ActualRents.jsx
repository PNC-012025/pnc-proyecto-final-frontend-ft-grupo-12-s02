import Header from '../../components/header/Header';
import MyRentsCard from '../../components/cards/myRentsCard/MyRentsCard';
import CurrentDetailCard from '../../components/cards/currentDetailCard/CurrentDetailCard';
import { useState, useEffect } from 'react';
import RentsSwitcher from '../../components/rentsSwitcher/RentsSwitcher';
import useReservation from '../../hooks/useReservation';
import useUser from '../../hooks/useUser';
import PastDetailCard from '../../components/cards/pastDetailCard/PastDetailCard';


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

export default function ActualRents() {
    const { user } = useUser();
    const { userReservations, getUserReservations } = useReservation();
    const [activeReservations, setActiveReservations] = useState([]);

    useEffect(() => {
        if (user && user.userId) {
            getUserReservations(user.userId);
        }
    }, [user, getUserReservations]);

    useEffect(() => {
        if (userReservations && userReservations.length > 0) {
            setActiveReservations(userReservations.filter(r => r.status === 'ACTIVE'));
        }
    }, [userReservations]);



    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-6xl mx-auto pt-28 pb-16 px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-semibold text-gray-900 mb-8">
                    Mis rentas actuales
                </h2>

                <RentsSwitcher />

                <div className="space-y-10">
                    {activeReservations.map((activeReservation) => (
                        <div key={activeReservation.reservedCar.carId} className="flex justify-between items-start gap-6">
                            <div className='flex-1'>
                                <MyRentsCard car={activeReservation.reservedCar} />
                            </div>

                           < CurrentDetailCard  rent={activeReservation}/>

                        </div>

                    ))}

                </div>

            </div>
        </div>
    );
}
