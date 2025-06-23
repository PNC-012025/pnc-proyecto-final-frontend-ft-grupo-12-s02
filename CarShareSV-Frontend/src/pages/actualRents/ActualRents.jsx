import Header from '../../components/header/Header';
import MyRentsCard from '../../components/cards/myRentsCard/MyRentsCard';
import CurrentDetailCard from '../../components/cards/currentDetailCard/CurrentDetailCard';
import { useState } from 'react';
import card1 from '../../assets/images/card1.jpg';
import card2 from '../../assets/images/card2.jpg';
import RentsSwitcher from '../../components/rentsSwitcher/RentsSwitcher';

export default function ActualRents() {

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

    const [cars] = useState(allRents);

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
                            <CurrentDetailCard car={car} />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
