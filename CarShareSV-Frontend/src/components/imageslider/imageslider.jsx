import React, { useState } from "react";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!images || images.length === 0) return null;

  const prevImage = (e) => {
    e && e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e && e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const openFullscreen = () => setIsFullscreen(true);
  const closeFullscreen = (e) => {
    e.stopPropagation();
    setIsFullscreen(false);
  };

  if (isFullscreen) {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 rounded-xl"
        onClick={closeFullscreen}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
          className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-4xl rounded-full w-12 h-12 flex items-center justify-center shadow"
          aria-label="Anterior"
        >
          ‹
        </button>
        <img
          src={images[currentIndex]}
          alt={`img-full-${currentIndex}`}
          className="max-w-3xl max-h-[80vh] rounded shadow-lg"
          onClick={(e) => e.stopPropagation()}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
          className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-4xl rounded-full w-12 h-12 flex items-center justify-center shadow"
          aria-label="Siguiente"
        >
          ›
        </button>
        <button
          onClick={closeFullscreen}
          className="absolute top-8 right-8 bg-red-600 hover:bg-red-700 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl"
          aria-label="Cerrar"
        >
          ×
        </button>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`block w-3 h-3 rounded-full ${
                idx === currentIndex ? "bg-primary" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center w-100 h-75 ">
      <button
        onClick={prevImage}
        className="absolute left-2 z-10 bg-white/80 hover:bg-white text-2xl rounded-full w-8 h-8 flex items-center justify-center shadow"
        aria-label="Anterior"
      >
        ‹
      </button>
      <img
        src={images[currentIndex]}
        alt={`img-${currentIndex}`}
        className="w-full h-full object-cover rounded-xl cursor-pointer"
        onClick={openFullscreen}
        title="Ver en pantalla completa"
      />
      <button
        onClick={nextImage}
        className="absolute right-2 z-10 bg-white/80 hover:bg-white text-2xl rounded-full w-8 h-8 flex items-center justify-center shadow"
        aria-label="Siguiente"
      >
        ›
      </button>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`block w-2 h-2 rounded-full ${
              idx === currentIndex ? "bg-primary" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;