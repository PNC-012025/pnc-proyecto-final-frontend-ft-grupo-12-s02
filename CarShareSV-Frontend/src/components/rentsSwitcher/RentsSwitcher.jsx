import { useNavigate, useLocation } from "react-router-dom";

export default function RentsSwitcher() {
    
  const navigate = useNavigate();
  const location = useLocation();

  const isCurrent = location.pathname.includes("actuals");
  const isPast = location.pathname.includes("pasts");

  return (
    <div className="flex justify-center space-x-6 border-b border-gray-200 mb-10">
      <button
        className={`pb-2 text-m font-medium ${
          isCurrent ? "border-b-2 border-primary text-primary": "text-gray-500"
        }`}
        onClick={() => navigate("/rents/actuals")}
      >
        Rentas actuales
      </button>
      <button
        className={`pb-2 text-m font-medium ${
          isPast ? "border-b-2 border-primary text-primary" : "text-gray-500"
        }`}
        onClick={() => navigate("/rents/pasts")}
      >
        Rentas pasadas
      </button>
    </div>
  );
}
