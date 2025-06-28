import Button from "../../button/Button";

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

export default function PastDetailCard({ rent }) {
    return (
        <div className="flex gap-4 items-start"> 
        
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-79 h-87">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalle de renta:</h3>

                <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tarifa de alquiler / día:</span>
                        <span className="font-medium">${rent.reservedCar.dailyPrice}</span>
                    </div>
                    <hr className="border-gray-200" />
                    <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>${rent.total}</span>
                    </div>
                </div>

                <div className="space-y-2 mb-6 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Inicio:</span>
                        <span>{formatDate(rent.startDate)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Fin:</span>
                        <span>{formatDate(rent.endDate)}</span>
                    </div>
                </div>

                <div className="flex flex-col space-y-3">
                    <input
                        type="number"
                        placeholder="Calificación"
                        className="w-full px-4 py-2 border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
                    />
                    <input
                        type="text"
                        placeholder="Comentario"
                        className="w-full px-4 py-2 border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
                    />
                </div>
            </div>

            <Button className="self-center w-30">
                Enviar
            </Button>
        </div>
    );
}
