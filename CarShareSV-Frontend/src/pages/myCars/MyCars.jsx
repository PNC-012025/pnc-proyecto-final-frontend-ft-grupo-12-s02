import Header from '../../components/header/Header';
import MyCarsCard from "../../components/cards/myCarsCard/MyCarsCard";
import { useEffect } from 'react';
import useCars from '../../hooks/useCars';

export default function MyCars() {

    const { getUserCars, userCars, loading, setUserCars } = useCars();
    
    useEffect(() => {
      getUserCars();   
    }, [getUserCars]);

    const handleDeleteCar = (carId) => {
      setUserCars(prevCars => prevCars.filter(car => car.carId !== carId));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            {loading ? <p>Cargando carros del usuario...</p> : 
            <div className="max-w-6xl mx-auto pt-28 pb-16 px-4 sm:px-6 lg:px-8">
                 <h2 className="text-4xl font-semibold text-gray-900 mb-12">
                Vehículos Publicados
                </h2>
                <div className="space-y-6">
                    {userCars.map((car) => (
                        <MyCarsCard
                            key={car.carId}
                            car={car}
                            onDelete={handleDeleteCar}
                        /> 
                    ))}
                    
                </div>
            </div>
            }
            
        </div>

    );


}
