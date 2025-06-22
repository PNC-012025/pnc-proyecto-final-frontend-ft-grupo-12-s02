import React, { useState } from "react";

const ImageSlider = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`img-${i}`}
            className="w-45 h-45 object-cover cursor-pointer rounded"
            onClick={() => openModal(i)}
          />
        ))}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={closeModal}>

      <div className="absolute left-5 flex flex-col items-center gap-1">
        <button
        onClick={prevImage}
        className="w-16 h-16 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-6xl shadow-lg transition focus:outline-none">
        ‹
        </button>
        <span className="text-xl text-white">Prev</span>
      </div>

        <img
          src={images[currentIndex]}
          alt={`img-full-${currentIndex}`}
          className="max-w-full max-h-full rounded"
          onClick={(e) => e.stopPropagation()}
        />

      <div className="absolute right-5 flex flex-col items-center gap-1">
        <button
        onClick={nextImage}
        className="w-16 h-16 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-6xl shadow-lg transition focus:outline-none">
        ›
        </button>
        <span className="text-white text-xl">Next</span>
      </div>

      <button
        onClick={closeModal}
        className="absolute top-5 right-5 flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-white text-xl shadow-lg transition focus:outline-none"
        aria-label="Cerrar">× 
        <span className="text-xl">Cerrar</span>
      </button>

      </div>
      )}
    </div>
  );
};

export default ImageSlider;
