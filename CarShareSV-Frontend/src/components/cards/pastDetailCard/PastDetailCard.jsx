import { useState } from "react";
import Button from "../../button/Button";
import useReview from "../../../hooks/useReview";

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

export default function PastDetailCard({ rent }) {
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const { createReview, isLoading } = useReview();


    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);
        setError(false);

        if (
            !rating ||
            !comment ||
            comment.length < 10 ||
            rating < 0 ||
            rating > 5
        ) {
            setError("Completa ambos campos correctamente.");
            return;
        }

        try {
            await createReview(
                { comment, rating: Number(rating) },
                rent.reservedCar.carId
            );
            setSuccess(true);
            setComment("");
            setRating("");
        } catch (err) {
            if (
                err.message &&
                err.message.includes("llave duplicada") &&
                err.message.includes("user_id")
            ) {
                setError("Ya has dejado una reseña para este vehículo.");
            } else {
                setError("Ocurrió un error al enviar la reseña.");
            }
        }
    };

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

                <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
                    <select
                        value={rating}
                        onChange={e => setRating(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
                        required
                    >
                        <option value="">Calificación (1-5)</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <input
                        type="text"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder="Comentario"
                        className="w-full px-4 py-2 border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
                    />
                    <Button className="self-center w-30" type="submit" disabled={isLoading}>
                        {isLoading ? "Enviando..." : "Enviar"}
                    </Button>
                    {success && <span className="text-green-600 text-sm">¡Reseña enviada!</span>}
                    {error && <span className="text-red-600 text-sm">{error}</span>}
                </form>
            </div>
        </div>
    );
}
