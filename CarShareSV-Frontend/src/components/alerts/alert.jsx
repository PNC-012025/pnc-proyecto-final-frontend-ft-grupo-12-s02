import React from 'react';
import Button from '../../components/button/Button';

//reutilizar el componente en todos los errores/notificaciones

const AlertPopup = ({ message, isOpen, onClose }) => {
    if (!isOpen) return null;

return (
    <div className="fixed inset-0 bg-opacity-1 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-white p-5 rounded-xl shadow-lg min-w-[300px] text-center relative">
            <span className="block mb-4 p-2 text-2xl  text-gray-800 whitespace-pre-line">{message}</span>
            <Button
                className="px-4 py-2"
                onClick={onClose}
            >
                Cerrar
            </Button>
        </div>
    </div>
);
};

export default AlertPopup;
