import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageSlider from "../../components/imageslider/imageslider";
import Button from "../../components/button/Button";
import Alert from "../../components/alerts/alert";
import Header from "../../components/header/Header";
import useUploadImage from "../../hooks/useUploadImage";
import useManageCars from "../../hooks/useManageCars";
import { useDropzone } from 'react-dropzone'

const BRANDS = [
  "Toyota", "Hyundai", "Nissan", "Kia", "Chevrolet", "Ford", "Honda", "Mitsubishi",
  "Suzuki", "Mazda", "Volkswagen", "Mercedes-Benz", "BMW", "Audi", "Isuzu", "Jeep"
];

const MODELS_BY_BRAND = {
  Toyota: ["Corolla", "Yaris", "RAV4", "Hilux", "Land Cruiser", "4Runner", "Fortuner", "Corolla Cross", "Tacoma"],
  Hyundai: ["Tucson", "Elantra", "Santa Fe", "Kona", "Creta", "Accent", "Venue"],
  Nissan: ["Sentra", "X-Trail", "Patrol", "Versa", "Kicks", "Juke", "Qashqai", "Pathfinder", "Murano", "Rogue", "Frontier"],
  Kia: ["Soul", "Sportage", "Sorento", "Rio", "Seltos", "Picanto", "Forte"],
  Chevrolet: ["Aveo", "Sonic", "Silverado", "Tracker", "Equinox", "Trailblazer", "Captiva", "Tahoe", "Suburban", "Colorado", "Blazer", "Traverse", "Spark", "Trax"],
  Ford: ["Focus", "Explorer", "F-150", "Escape", "Ranger", "Edge", "Bronco", "Fiesta", "EcoSport"],
  Honda: ["Civic", "Accord", "CR-V", "HR-V", "Fit", "Pilot", "Ridgeline", "Odyssey"],
  Mitsubishi: ["Lancer", "Outlander", "Montero", "Outlander Sport", "Eclipse Cross", "ASX", "Mirage", "L200"],
  Suzuki: ["Swift", "Vitara", "Baleno", "S-Cross", "Jimny"],
  Mazda: ["3", "6", "CX-3", "CX-30", "CX-5", "CX-60", "CX-9", "CX-90", "BT-50", "MX-5"],
  Volkswagen: ["Golf", "Jetta", "Tiguan", "Passat", "Teramont", "T-Cross", "Taos", "Amarok", "Virtus", "Nivus"],
  "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "S-Class", "CLA", "GLB", "GLC", "GLE", "GLS", "G-Class", "Sprinter"],
  BMW: ["X1", "X2", "X3", "X4", "X5", "X6", "X7", "Serie 3", "Serie 5", "Serie 6"],
  Audi: ["A3", "A4", "A6", "A8", "Q2", "Q3", "Q5", "Q7", "Q8"],
  Isuzu: ["D-Max", "MU-X"],
  Jeep: ["Wrangler", "Cherokee", "Compass", "Renegade", "Grand Cherokee", "Gladiator", "Patriot"],
};

const YEARS = [
  2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025
];

const TRANSMISSIONS = [
  { value: "Automatic", label: "Automática" },
  { value: "Standard", label: "Manual" }
];

const CAPACITY = [2, 4, 5, 7];

const DOORS = [2, 4];

const PostPage = ({ editMode = false, postId = null, toEditPost = {} }) => {

  const navigate = useNavigate();

  let images = editMode ? toEditPost.images : [];

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [rawImages, setRawImages] = useState([]);
  const [preview, setPreview] = useState([]);

  const { uploadImages, imagesLoading } = useUploadImage();
  const { uploadCar, isLoading, hasError } = useManageCars();

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [transmission, setTransmission] = useState("");
  const [capacity, setCapacity] = useState("");
  const [dailyPrice, setDailyPrice] = useState("");
  const [doors, setDoors] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const availableModels = brand ? MODELS_BY_BRAND[brand] || [] : [];

  const [errors, setErrors] = useState({});

  const onDrop = useCallback(acceptedFiles => {
    setRawImages(prev => [...prev, ...acceptedFiles]);
    setPreview(prev => [
      ...prev,
      ...acceptedFiles.map(file => ({
        name: file.name,
        url: URL.createObjectURL(file)
      }))
    ]);
  }, []);

  const handleRemoveImage = (index) => {
    setPreview(prev => prev.filter((_, i) => i !== index));
    setRawImages(prev => prev.filter((_, i) => i !== index));
  };


  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handlePost = async () => {
    const newErrors = {};

    const plateRegex = /^P[0-9A-F]{3,6}$/i;

    if (!dailyPrice || isNaN(dailyPrice) || Number(dailyPrice) <= 0) {
      newErrors.dailyPrice = "El precio debe ser un número mayor a 0.";
    }

    if (description.length > 255) {
      newErrors.description = "La descripción no puede tener más de 255 caracteres.";
    }
    if (location.length > 255) {
      newErrors.location = "La ubicación no puede tener más de 255 caracteres.";
    }

    if (!plateRegex.test(plateNumber)) {
      newErrors.plateNumber = "La placa debe tener el formato correcto (ej: P123456).";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({})

    try {

      images = await uploadImages(rawImages);

      const carData = {
        brand,
        model,
        year,
        transmission,
        capacity,
        dailyPrice,
        doors,
        plateNumber,
        location,
        description,
        images
      };


      await uploadCar(carData);

      setAlertMessage("Vehículo publicado con éxito.");
      setAlertOpen(true);
    } catch (error) {
      console.error("Error al publicar el vehículo:", error);
      setAlertMessage("Ocurrió un error al publicar, intenta de nuevo.");
      setAlertOpen(true);
    }
  };

  const commonClass =
    "rounded-full px-4 py-2 border border-gray-300 w-full max-w-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300";


  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        <h2 className="text-4xl font-semibold text-gray-900 mb-12">
          Publica tu vehículo
        </h2>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-md p-4">
              {/* Dropzone */}
              <div
                {...getRootProps()}
                className="cursor-pointer border-2 border-dashed border-primary rounded-xl h-164 w-full max-w-[420px] flex flex-col items-center justify-center transition hover:bg-primary/10"
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p className="text-primary">Suelta las imágenes aquí...</p>
                ) : (
                  <p className="text-gray-500">Arrastra o haz click para seleccionar imágenes</p>
                )}
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  {(preview.length > 0 ? preview : images)?.map((img, idx) => (
                    <div key={img.name || img} className="relative">
                      <img
                        src={img.url || img}
                        alt="preview"
                        className="w-20 h-20 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation();
                          handleRemoveImage(idx);
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700"
                        title="Eliminar"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Formulario */}
          <div className="lg:w-2/3 w-full">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-md space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Marca */}
                <div>
                  <select
                    className={commonClass}
                    value={brand}
                    onChange={e => {
                      setBrand(e.target.value);
                      setModel("");
                    }}
                    required
                  >
                    <option value="">Marca</option>
                    {BRANDS.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {/* Modelo */}
                <div>
                  <select
                    className={commonClass}
                    value={model}
                    onChange={e => setModel(e.target.value)}
                    required
                    disabled={!brand}
                  >
                    <option value="">Modelo</option>
                    {availableModels.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                {/* Año */}
                <div>
                  <select
                    className={commonClass}
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    required
                  >
                    <option value="">Año</option>
                    {YEARS.map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                {/* Transmisión */}
                <div>
                  <select
                    className={commonClass}
                    value={transmission}
                    onChange={e => setTransmission(e.target.value)}
                    required
                  >
                    <option value="">Transmisión</option>
                    {TRANSMISSIONS.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>

                {/* Pasajeros */}
                <div>
                  <select
                    className={commonClass}
                    value={capacity}
                    onChange={e => setCapacity(e.target.value)}
                    required
                  >
                    <option value="">Pasajeros</option>
                    {CAPACITY.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                {/* Precio */}
                <div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      placeholder="Precio / día"
                      className={`${commonClass} pl-7`}
                      min="1"
                      value={dailyPrice}
                      onChange={e => setDailyPrice(e.target.value)}
                      required

                    />
                  </div>
                  {errors.dailyPrice && <p className="text-red-500 text-sm">{errors.dailyPrice}</p>}
                </div>

                {/* Puertas */}
                <div>
                  <select
                    className={commonClass}
                    value={doors}
                    onChange={e => setDoors(e.target.value)}
                    required
                  >
                    <option value="">Número de puertas</option>
                    {DOORS.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Placa del carro */}
              <div>
                <input
                  type="text"
                  placeholder="Placa del vehículo"
                  className={commonClass + " mt-6"}
                  value={plateNumber}
                  onChange={e => setPlateNumber(e.target.value)}
                  required
                  maxLength={255}
                />
                {errors.plateNumber && <p className="text-red-500">{errors.plateNumber}</p>}
              </div>

              {/* Ubicación */}
              <input
                type="text"
                placeholder="Ubicación de entrega"
                className={commonClass}
                value={location}
                onChange={e => setLocation(e.target.value)}
                required
              />

              {/* Descripción */}
              <textarea
                placeholder="Descripción (detalles adicionales del vehículo)"
                className="w-full rounded-xl px-4 py-3 border border-gray-300 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition h-32 resize-none"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
                maxLength={255}
              />
              {errors.description && <p className="text-red-500">{errors.description}</p>}

              <div className="flex justify-center">
                <Button
                  className="bg-primary text-white rounded-full text-sm"
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
          onClose={() => { setAlertOpen(false); navigate("/explore"); }}
        />
      </div>
    </div>
  );
};

export default PostPage;
