import React from "react";
import { useState } from "react";
import PostFilters from "../../components/filters/postfilters/PostFilters";
import card1 from "../../assets/images/card1.jpg";
import card2 from "../../assets/images/card2.jpg";
import card3 from "../../assets/images/card3.jpg";
import ImageSlider from "../../components/imageslider/imageslider";
import Button from "../../components/button/Button";
import Alert from "../../components/alerts/alert";
import Header from "../../components/header/Header";

const PostPage = () => {
  const images = [card1, card2, card3];

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handlePost = async () => {
    try {
      throw new Error('Simulación de error');
    } catch (error) {
      setAlertMessage('Ocurrió un error al publicar, intenta de nuevo.');
      setAlertOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <Header/>
      <h2 className="text-5xl font-semibold mb-8 mt-20 ml-5">Publica tu vehículo</h2>

      <div className="ml-5 mr-5 p-8 flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <ImageSlider images={images} />
          <p className="text-pink-500 mt-2">Agregar imágenes</p>
        </div>

        <div className="w-full md:w-2/3 space-y-6">
          <PostFilters />

          <input
            type="text"
            placeholder="Ubicación de entrega"
            className="w-full rounded-full px-4 py-2 border border-gray-300"
          />

          <textarea
            placeholder="Descripción (detalles adicionales del vehículo)"
            className="w-full rounded-xl px-4 py-2 border border-gray-300 h-32 resize-none"
          />

          <div className="pt-4">
            <Button
              className="bg-pink-600 text-white px-6 py-2 rounded-full"
              onClick={handlePost}
            >
              Publicar
            </Button>
          </div>
        </div>
      </div>

      <Alert
        message={alertMessage}
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
      />
    </div>
  );
};

export default PostPage;
