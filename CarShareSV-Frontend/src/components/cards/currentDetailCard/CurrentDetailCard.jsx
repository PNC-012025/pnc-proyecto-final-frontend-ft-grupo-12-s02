import useReservation from "../../../hooks/useReservation";
import Button from "../../button/Button";

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}


export default function CurrentDetailCard({ rent }) {
  const { cancelReservation } = useReservation();

  const handleOnClick = () => {
    cancelReservation(rent.reservationId);
  }

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

            <div className="flex justify-center">
                <Button onClick={handleOnClick} className="w-full mt-5">
                    Cancelar
                </Button>
            </div>
        </div>
    );

}