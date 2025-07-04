import Header from '../../components/header/Header';
import MyRentsCard from '../../components/cards/myRentsCard/MyRentsCard';
import { useState, useEffect } from 'react';
import PastDetailCard from '../../components/cards/pastDetailCard/PastDetailCard';
import RentsSwitcher from '../../components/rentsSwitcher/RentsSwitcher';
import useReservation from '../../hooks/useReservation';
import useUser from '../../hooks/useUser';
import { isBefore, parseISO, startOfDay } from 'date-fns';

export default function PastRents() {


    const { user } = useUser();
    const { userReservations, getUserReservations } = useReservation();
    const [finishedReservations, setFinishedReservations] = useState([
    
    ]);

    useEffect(() => {
    if (user && user.userId) {
        getUserReservations(user.userId);

        const today = startOfDay(new Date());
        setFinishedReservations(
            userReservations.filter(r =>
                r.status === 'FINISHED' ||
                isBefore(startOfDay(parseISO(r.endDate)), today)
            )
        );
    }
}, [user, getUserReservations, userReservations]);
    

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-6xl mx-auto pt-28 pb-16 px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-semibold text-gray-900 mb-8">Mis rentas pasadas </h2>

                <RentsSwitcher />

                <div className="space-y-10">
                    {finishedReservations.map((finishedReservation) => (
                        <div key={finishedReservation.reservedCar.carId} className="flex justify-between items-start gap-6">
                            <div className='flex-1'>
                                <MyRentsCard car={finishedReservation.reservedCar} />
                            </div>
                            <PastDetailCard rent={finishedReservation}/>
                        </div>
                    ))}

                </div>

            </div>
        </div>
    );
}




