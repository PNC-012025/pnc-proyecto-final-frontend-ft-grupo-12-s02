import Header from '../../components/header/Header';
import MyRentsCard from '../../components/cards/myRentsCard/MyRentsCard';
import { useState, useEffect } from 'react';
import PastDetailCard from '../../components/cards/pastDetailCard/PastDetailCard';
import RentsSwitcher from '../../components/rentsSwitcher/RentsSwitcher';
import useReservation from '../../hooks/useReservation';
import useUser from '../../hooks/useUser';

export default function PastRents() {


    const { user } = useUser();
    const { userReservations, getUserReservations } = useReservation();
    const [finishedReservations, setFinishedReservations] = useState([
         /* {
        startDate: "2025-06-20",
        endDate: "2025-06-22",
        address: "Dirección de ejemplo",
        total: 120.0,
        status: "FINISHED",
        reservingUsername: "EjemploUser",
        reservedCar: {
            carId: "mock-car-id-1",
            plateNumber: "P123456",
            description: "Auto de prueba, 4 puertas, aire acondicionado.",
            visible: true,
            doors: 4,
            capacity: 5,
            dailyPrice: 60.0,
            location: "Dirección de ejemplo",
            year: 2020,
            username: "EjemploOwner",
            model: "ModeloX",
            brand: "MarcaY",
            transmission: "Manual",
            images: [
                "https://via.placeholder.com/300"
            ]
        }
    }*/
    ]);

    
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




