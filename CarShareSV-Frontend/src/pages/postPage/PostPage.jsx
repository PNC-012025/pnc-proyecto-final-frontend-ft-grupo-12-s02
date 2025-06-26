import React, { useState } from "react";
import PostFilters from "../../components/filters/postfilters/PostFilters";
import card1 from "../../assets/images/card1.jpg";
import card2 from "../../assets/images/card2.jpg";
import card3 from "../../assets/images/card3.jpg";
import ImageSlider from "../../components/imageslider/imageslider";
import Button from "../../components/button/Button";
import Alert from "../../components/alerts/alert";
import Header from "../../components/header/Header";
import useUploadImage from "../../hooks/useUploadImage"; 
import useManageCars from "../../hooks/useManageCars";

const PostPage = () => {
  const images = [card1, card2, card3];
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [rawImages, setRawImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const { uploadImages, imagesLoading } = useUploadImage();
  const { uploadCar, isLoading, hasError } = useManageCars();

  const onDrop = useCallback(acceptedFiles => {
    setRawImages(acceptedFiles);
    let imgPrevs = [];

    for (const acceptedFile of acceptedFiles) {
      imgPrevs.push({
        name: acceptedFile.name,
        url: URL.createObjectURL(acceptedFile)
      });
    }

    setPreview(imgPrevs);
  }, []);

  const handlePost = async () => {
    try {
      throw new Error("Simulación de error");
    } catch (error) {
      console.error("Error al publicar el vehículo:", error);
      setAlertMessage("Ocurrió un error al publicar, intenta de nuevo.");
      setAlertOpen(true);
    }
  };

  const commonClass =
    "w-full rounded-full border border-gray-300 px-4 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition";

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        <h2 className="text-4xl font-semibold text-gray-900 mb-12 text-center">
          Publica tu vehículo
        </h2>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Slider de imágenes */}
          <div className="lg:w-1/3 w-full">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-md p-4">
              <ImageSlider images={images} />
              <p className="text-center text-sm text-primary mt-3 font-medium">
                Agregar imágenes
              </p>
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:w-2/3 w-full">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-md space-y-6">
              <PostFilters />

              {/* Placa del carro */}
              <input
                type="text"
                placeholder="Placa del vehículo"
                className={commonClass}
              />

              {/* Ubicación */}
              <input
                type="text"
                placeholder="Ubicación de entrega"
                className={commonClass}
              />

              {/* Descripción */}
              <textarea
                placeholder="Descripción (detalles adicionales del vehículo)"
                className="w-full rounded-xl px-4 py-3 border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition h-32 resize-none"
              />

              <div className="flex justify-center pt-4">
                <Button
                  className="px-6 py-2 bg-primary text-white rounded-full text-sm"
                  onClick={handlePost}
                >
                  Publicar
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Alert
          message={alertMessage}
          isOpen={alertOpen}
          onClose={() => setAlertOpen(false)}
        />
      </div>
    </div>
  );
};

export default PostPage;
