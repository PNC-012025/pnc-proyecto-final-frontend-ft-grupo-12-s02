import Header from "../../../components/header/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCars from "../../../hooks/useCars"
import useUser from "../../../hooks/useUser";
import { useContext } from "react";
import UserContext from "../../../context/UserContext"; 
import Alert from "../../../components/alerts/alert"
import CarCard from "../../../components/cards/CarCard/CarCard";

export default function HiddenCars() {
  const { user } = useContext(UserContext);
  const { getHiddenCars, cars, loading } = useCars();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!(user?.roles?.includes("ROLE_ADMIN") || user?.roles?.includes("ROLE_SYSADMIN"))) {
      setAlertMessage("Acceso denegado. Solo administradores pueden ver esta página.");
      setAlertOpen(true);
      return;
    }
    getHiddenCars()
      .catch(() => {
        setAlertMessage("Error al cargar vehículos ocultos.");
        setAlertOpen(true);
      });
  }, [getHiddenCars, user]);

  if (!(user?.roles?.includes("ROLE_ADMIN") || user?.roles?.includes("ROLE_SYSADMIN"))) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Alert
          isOpen={alertOpen}
          onClose={() => setAlertOpen(false)}
          message={alertMessage}
        />
        <div className="max-w-2xl mx-auto pt-32 text-center text-xl text-red-600">
          Acceso denegado.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8">
          Vehículos Ocultos
        </h2>
        {loading ? (
          <p>Cargando vehículos ocultos...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ">
            {cars.length === 0 ? (
              <p>No hay vehículos ocultos.</p>
            ) : (
              cars.map((car, index) => (
                <CarCard
                  key={index}
                  car={car}
                  onClick={() => navigate(`/car/${car.carId || index}`, { state: { car } })}
                />
              ))
            )}
          </div>
        )}
        <Alert
          isOpen={alertOpen}
          onClose={() => setAlertOpen(false)}
          message={alertMessage}
        />
      </div>
    </div>
  );
}