import { useState } from "react";
import useReservation from "../../../hooks/useReservation";
import Button from "../../button/Button";
import Alert from "../../alerts/alert";
import useUser from "../../../hooks/useUser";

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

export default function CurrentDetailCard({ rent, onRemove }) {
    const { cancelReservation } = useReservation();
    const { user, token } = useUser();
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [cancelSuccess, setCancelSuccess] = useState(false);

    const handleOnClick = async () => {
        setLoading(true);
        try {
            await cancelReservation(rent.reservationId, token);
            setAlertMessage("Reserva cancelada exitosamente."); // Solo aquí el mensaje de éxito
            setCancelSuccess(true);
        } catch (error) {
            let msg = "Error al cancelar la reserva. Inténtalo de nuevo.";
            if (error?.response && typeof error.response.json === "function") {
                try {
                    const data = await error.response.json();
                    msg = data.message || msg;
                } catch { }
            } else if (error?.message) {
                msg = error.message;
            }
            setAlertMessage(msg); // Aquí solo mensaje de error
            setCancelSuccess(false);
        } finally {
            setAlertOpen(true);
            setLoading(false);
        }
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
        // Si fue exitosa, pide al padre quitar la card
        if (cancelSuccess && onRemove) {
            onRemove(rent.reservationId);
        }
    };

    const isCancelable = rent.status === "ACTIVE";

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-100 h-87">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalle de renta:</h3>

            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tarifa de alquiler / días:</span>
                    <span className="font-medium">${rent.reservedCar.dailyPrice}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${rent.total}</span>
                </div>
            </div>

            <div className="space-y-2 mb-3 mt-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-600">Inicio:</span>
                    <span>{formatDate(rent.startDate)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Fin:</span>
                    <span>{formatDate(rent.endDate)}</span>
                </div>
            </div>

            <div className="flex justify-center mt-6">
                <Button
                    onClick={handleOnClick}
                    className="w-full mt-5"
                    disabled={!isCancelable || loading}
                >
                    {loading ? "Cancelando..." : "Cancelar"}
                </Button>
            </div>

            <Alert
                isOpen={alertOpen}
                onClose={handleAlertClose}
                message={alertMessage}
            />
        </div>
    );
}