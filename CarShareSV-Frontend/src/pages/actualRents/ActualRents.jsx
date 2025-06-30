import Header from '../../components/header/Header';
import MyRentsCard from '../../components/cards/myRentsCard/MyRentsCard';
import CurrentDetailCard from '../../components/cards/currentDetailCard/CurrentDetailCard';
import { useState, useEffect } from 'react';
import RentsSwitcher from '../../components/rentsSwitcher/RentsSwitcher';
import useReservation from '../../hooks/useReservation';
import useUser from '../../hooks/useUser';
import PastDetailCard from '../../components/cards/pastDetailCard/PastDetailCard';

export default function ActualRents() {
    const { user } = useUser();
    const { userReservations, getUserReservations } = useReservation();
    const [activeReservations, setActiveReservations] = useState([]);

    const removeReservation = (reservationId) => {
        setActiveReservations(prev => prev.filter(r => r.reservationId !== reservationId));
    };


    useEffect(() => {
        if (user && user.userId) {
            getUserReservations(user.userId);
        }
    }, [user, getUserReservations]);

    useEffect(() => {
        localStorage.setItem("userReservationsCount", userReservations.length);

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

                            <CurrentDetailCard
                                rent={activeReservation}
                                onRemove={removeReservation}
                            />

                        </div>

                    ))}

                </div>

            </div>
        </div>
    );
}
