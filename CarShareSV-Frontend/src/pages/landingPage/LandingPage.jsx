import Header from "../../components/header/Header";
import backgroundImage from '../../assets/images/backgroundImage.jpg';


export default function LandingPage() {
    return (
        <div
            className="relative h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <Header />
            <div className="flex flex-col justify-center items-center h-full text-white text-center px-4">
                <h1 className="text-5xl md:text-8xl max-w-5xl font-bold mb-20 transition-transform duration-300 hover:scale-105">
                    Elige, reserva, maneja. Así de simple.
                </h1>
                <p className="text-lg md:text-xl max-w-5xl transition-transform duration-300 hover:scale-105">
                    Una plataforma donde puedes publicar tu carro para rentar o encontrar el vehículo perfecto en El Salvador, todo en un solo lugar, rápido y seguro.
                </p>
            </div>
        </div>
    );
}
