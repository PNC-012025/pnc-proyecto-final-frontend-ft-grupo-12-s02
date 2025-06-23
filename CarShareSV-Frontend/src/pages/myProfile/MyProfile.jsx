import { FaUser, FaCar, FaCalendarAlt } from 'react-icons/fa';
import Button from '../../components/button/Button';
import Header from '../../components/header/Header';

export default function MyProfile() {

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Header />
      <div className="w-full max-w-2xl pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center mb-6">
                <FaUser size={64} className="text-gray-500" />
              </div>

            
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Diego Calvo</h1>
              <p className="text-gray-600 mb-6">papucalvo@gmail.com</p>

              <Button className="mb-8">
                Editar perfil
              </Button>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            <div className="text-center mb-8">
              <p className="text-gray-600">Teléfono: 7712-3213</p>
            </div>

            <div className="flex justify-center space-x-12 mb-8">
              <div className="flex items-center text-sm text-gray-600">
                <FaCar size={16} className="mr-2 text-primary" />
                <span>Vehículos publicados: </span>
                <span className="font-medium text-gray-900 ml-1">2</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <FaCalendarAlt size={16} className="mr-2 text-primary" />
                <span>Vehículos rentados: </span>
                <span className="font-medium text-gray-900 ml-1">2</span>
              </div>
            </div>

            <div className="flex justify-center">
              <Button className="bg-primary hover:bg-primary/90">
                Cerrar sesión
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
