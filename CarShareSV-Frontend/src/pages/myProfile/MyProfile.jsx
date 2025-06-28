import { FaUser, FaCar, FaCalendarAlt } from 'react-icons/fa';
import Button from '../../components/button/Button';
import Header from '../../components/header/Header';
import useUser from '../../hooks/useUser';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyProfile() {
  const { user, isLogged, logout } = useUser();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged && user && user.data) {
      console.log("MyProfile useEffect: user.data existe", user.data);
      setUserData(user.data);
    } else if (isLogged && user && Object.keys(user).length > 0 && !user.data) {
      console.log("MyProfile useEffect: user existe pero user.data no. User object:", user);
      if (user.firstName || user.email) {
        setUserData(user);
      }
    } else {
      console.log("MyProfile useEffect: isLogged o user no están listos. isLogged:", isLogged, "User:", user);
    }
  }, [user, isLogged]);

  if (!isLogged) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p>Por favor, inicia sesión para ver tu perfil.</p>
        </div>
      </>
    );
  }

  if (!userData) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p>Cargando perfil...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pt-20">
      <h2 className="text-4xl font-semibold text-gray-900 mb-8">
       Mi Perfil
      </h2>
      <div className="w-full max-w-2xl pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-8">

              <div className="flex flex-col items-center text-center">

                <div className="flex items-center justify-center mb-6 gap-4">

                  <FaUser size={48} className="text-gray-500" />
                  <h1 className="text-2xl font-bold text-gray-900">
                    {userData.firstName || 'N/A'} {userData.lastName || ''}
                  </h1>
                </div>
                <p className="text-gray-600 mb-2">{userData.username || 'N/A'}</p>
                <p className="text-gray-600 mb-4">{userData.email || 'N/A'}</p>
                <Button className="mb-2">
                  Editar perfil
                </Button>
              </div>
              <div className="border-t border-gray-200 my-8"></div>
              <div className="text-center mb-8">
                <p className="text-gray-600">Teléfono: {userData.phoneNumber || 'N/A'}</p>
              </div>
              <div className="flex justify-center space-x-12 mb-8">
                <div className="flex items-center text-sm text-gray-600">
                  <FaCar size={16} className="mr-2 text-primary" />
                  <span>Vehículos publicados:  </span>
                  <span className="font-medium text-gray-900 ml-1">{ localStorage.getItem("userPostedCarsCount") }</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaCalendarAlt size={16} className="mr-2 text-primary" />
                  <span>Vehículos rentados: </span>
                  <span className="font-medium text-gray-900 ml-1">{ localStorage.getItem("userReservationsCount") }</span>
                </div>
              </div>
              <div className="flex justify-center mt-8">
                <Button onClick={() => {
                  logout();
                  navigate('/');
                }} className="bg-primary hover:bg-primary/90">
                  Cerrar sesión
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
