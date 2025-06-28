import { useNavigate, useLocation } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { useEffect, useState } from "react";
import useReservation from "../../hooks/useReservation";

export default function RentsSwitcher() {
    
  const navigate = useNavigate();
  const location = useLocation();

  const isCurrent = location.pathname.includes("actuals");
  const isPast = location.pathname.includes("pasts");

  const { getUserReservations, userReservations, isLoading, hasError } = useReservation();
  const { user } = useUser();
  const [activeReservations, setActiveReservations] = useState([]);
  const [finishedReservations, setFinishedReservations] = useState([]);

  useEffect(() => {
    if (user && user.userId) {
      getUserReservations(user.userId);
    }
  }, [user, getUserReservations]);

  useEffect(() => {
    const fRes = userReservations.filter(reservation => reservation.status === "FINISHED");
    setFinishedReservations(fRes);

    const aRes = userReservations.filter(reservation => reservation.status === "ACTIVE");
    setActiveReservations(aRes);
  }, [userReservations]);


  return (
    <div className="flex justify-center space-x-6 border-b border-gray-200 mb-10">
      <button
        className={`pb-2 text-m font-medium ${
          isCurrent ? "border-b-2 border-primary text-primary": "text-gray-500"
        }`}
        onClick={() => navigate("/rents/actuals", { state: { activeReservations } })}
      >
        Rentas actuales
      </button>
      <button
        className={`pb-2 text-m font-medium ${
          isPast ? "border-b-2 border-primary text-primary" : "text-gray-500"
        }`}
        onClick={() => navigate("/rents/pasts", { state: { finishedReservations } })}
      >
        Rentas pasadas
      </button>
    </div>
  );
}
