import React from 'react';

const AlertPopup = ({ message, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg min-w-[300px] text-center relative">
                <span className="block mb-4 text-lg text-gray-800">{message}</span>
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default AlertPopup;
