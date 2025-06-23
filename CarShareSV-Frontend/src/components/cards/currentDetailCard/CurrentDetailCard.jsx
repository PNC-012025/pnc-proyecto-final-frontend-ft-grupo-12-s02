import Button from "../../button/Button";

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}


export default function CurrentDetailCard({ car }) {

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-80">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalle de renta:</h3>

            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tarifa de alquiler * {car.rent.period} días:</span>
                    <span className="font-medium">${car.rent.rentalCost}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tarifa de servicio:</span>
                    <span className="font-medium">${car.rent.serviceFee}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${car.rent.total}</span>
                </div>
            </div>

            <div className="space-y-2 mb-6 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-600">Inicio:</span>
                    <span>{formatDate(car.rent.startDate)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Fin:</span>
                    <span>{formatDate(car.rent.endDate)}</span>
                </div>
            </div>

            <div className="flex justify-center">
                <Button className="w-full ">
                    Cancelar
                </Button>
            </div>
        </div>
    );

}