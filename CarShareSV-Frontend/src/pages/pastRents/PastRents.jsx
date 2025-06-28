import Header from '../../components/header/Header';
import MyRentsCard from '../../components/cards/myRentsCard/MyRentsCard';
import { useState, useEffect } from 'react';
import card1 from '../../assets/images/card1.jpg';
import card2 from '../../assets/images/card2.jpg';
import PastDetailCard from '../../components/cards/pastDetailCard/PastDetailCard';
import RentsSwitcher from '../../components/rentsSwitcher/RentsSwitcher';
import useReservation from '../../hooks/useReservation';
import useUser from '../../hooks/useUser';

export default function PastRents() {

    const allRents = [
        {
            id: '1',
            model: 'Kia Soul',
            year: 2016,
            capacity: 5,
            doors: 4,
            transmission: 'Automático',
            type: 'SUV',
            rating: 4.8,
            reviewCount: 3,
            renterName: 'Carlos Canjura',
            image: card1,
            rent: {
                period: 3,
                rentalCost: 135,
                serviceFee: 15,
                total: 150,
                startDate: '2025-05-23',
                endDate: '2025-05-26'
            }
        },
        {
            id: '2',
            model: 'Kia Soul',
            year: 2013,
            capacity: 5,
            doors: 4,
            transmission: 'Automático',
            type: 'SUV',
            rating: 4.5,
            reviewCount: 1,
            renterName: 'Luis Martínez',
            image: card2,
            rent: {
                period: 2,
                rentalCost: 90,
                serviceFee: 10,
                total: 100,
                startDate: '2025-06-10',
                endDate: '2025-06-12'
            }
        }
    ];

    const cars=[];

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
                <h1 className="text-3xl font-semibold text-gray-900 mb-8">Mis rentas</h1>

                <RentsSwitcher />

                <div className="space-y-10">
                    {cars.map((car) => (
                        <div key={car.id} className="flex justify-between items-start gap-6">
                            <div className="flex-1">
                                <MyRentsCard car={car} />
                            </div>
                            <PastDetailCard car={car} />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
