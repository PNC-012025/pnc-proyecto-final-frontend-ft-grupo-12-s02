import Header from '../../components/header/Header';
import card1 from "../../assets/images/card1.jpg";
import card2 from "../../assets/images/card2.jpg";
import MyCarsCard from "../../components/cards/myCarsCard/MyCarsCard";
import { useState } from 'react';

export default function MyCars() {

    const allCars = [
        {
            id: '1',
            model: 'Kia Soul',
            year: 2016,
            passengers: 5,
            doors: 4,
            transmission: 'Automático',
            type: 'SUV',
            rating: 4.8,
            reviewCount: 3,
            status: 'rented',
            renterName: 'Carlos Canjura',
            rentalPeriod: '23/05/2025 - 26/04/2025',
            image: card1
        },
        {
            id: '2',
            model: 'Kia Soul',
            year: 2013,
            passengers: 5,
            doors: 4,
            transmission: 'Automático',
            type: 'SUV',
            rating: 4.5,
            reviewCount: 1,
            status: 'Sin rentar',
            image: card2
        }
    ];

    const [cars] = useState(allCars);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-4xl mx-auto pt-25 pb-16 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-semibold text-gray-900 mb-8">Vehículos publicados</h1>
                <div className="space-y-6">
                    {cars.map((car) => (
                        
                        <MyCarsCard
                            key={car.id}
                            car={car}
                        />
                        
                    ))}
                    
                </div>
            </div>

            
        </div>

    );


}
