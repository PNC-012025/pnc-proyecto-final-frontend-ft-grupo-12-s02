import Header from '../../components/header/Header';
import MyRentsCard from '../../components/cards/myRentsCard/MyRentsCard';
import CurrentDetailCard from '../../components/cards/currentDetailCard/CurrentDetailCard';
import { useState, useEffect } from 'react';
import RentsSwitcher from '../../components/rentsSwitcher/RentsSwitcher';
import useReservation from '../../hooks/useReservation';
import useUser from '../../hooks/useUser';

export default function ActualRents() {
    const { user } = useUser();
    const { userReservations, getUserReservations } = useReservation();
    const [activeReservations, setActiveReservations] = useState([]);

    useEffect(() => {
      if (user && user.userId) {
        getUserReservations(user.userId);

        setActiveReservations(userReservations.filter(r => r.status === 'ACTIVE'));
      }

      console.log("Active Reservations: ", activeReservations);
    }, [user, getUserReservations]);

    const cars = []

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-6xl mx-auto pt-28 pb-16 px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-semibold text-gray-900 mb-12">
                Publica tu vehículo
                </h2>
                
                <RentsSwitcher />

                <div className="space-y-10">
                    {cars?.map((car) => (
                        <div key={car.id} className="flex justify-between items-start gap-6">
                            <div className="flex-1">
                                <MyRentsCard car={car} />
                            </div>
                            <CurrentDetailCard car={car} />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
