import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import useUser from '../../hooks/useUser';
import AlertPopup from '../../components/alerts/alert';

const ROLES = {
    SYSADMIN: 'ROLE_SYSADMIN',
    ADMIN: 'ROLE_ADMIN',
    USER: 'ROLE_USER'
}

export default function Login() {
    const navigate = useNavigate();
    const { isLogged, isLoginLoading, hasLoginError, login, user } = useUser();  
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    // Estado para el alert
    const [alert, setAlert] = useState({
        isOpen: false,
        message: ''
    });

    useEffect(() => {
        if (hasLoginError) {
            console.log("ERROR EN LOGIN"); 
            setAlert({
                isOpen: true,
                message: "Credenciales inválidas, usuario y/o contraseña incorrectas."
            });
        }

        if (isLogged) {
            setAlert({
                isOpen: true,
                message: "Inicio de sesión con éxito."
            });
            if (user?.data?.roles?.includes(ROLES.ADMIN)) navigate("/Admin/AdminHome");
            else if (user?.data?.roles?.includes(ROLES.SYSADMIN)) navigate("/Admin/AdminHome");
            else if (user?.data?.roles?.includes(ROLES.USER)) navigate("/explore");
        }
    }, [hasLoginError, isLogged, user, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);
    };

    const handleCloseAlert = () => {
        setAlert({ isOpen: false, message: '' });
    };

    return (
        <div className="h-screen flex">
            {/* Alert */}
            <AlertPopup
                isOpen={alert.isOpen}
                message={alert.message}
                onClose={handleCloseAlert}
            />

            {/*Izquierda */}
            <div className="w-3/5 bg-white flex items-center justify-center p-8 h-full">
                <div className="w-full max-w-md">
                    <h1 className="text-5xl font-bold text-primary mb-8 text-center">Inicia sesión</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                name="username"
                                placeholder="Nombre de usuario"
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
                                required
                                disabled={isLoginLoading}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Contraseña"
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
                                required
                                disabled={isLoginLoading}
                            />
                        </div>
                        <div className="text-center mt-6">
                            <p className="text-gray-500 text-sm mb-4">
                                No tienes una cuenta?{' '}
                                <a href="/signin" className="text-primary hover:underline">
                                    Regístrate aquí
                                </a>
                            </p>
                            {isLoginLoading ? (
                                <strong>Validando credenciales...</strong>
                            ) : (
                                <Button type="submit" className="px-8 py-3">
                                    Iniciar sesión
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
            {/*Derecha*/}
            <div className="w-2/5 bg-gradient-to-br from-primary to-secondary via-[#7a2c7d] flex items-center justify-center text-white h-full">
                <div className="text-center px-8">
                    <h2 className="text-6xl font-bold leading-tight hover:scale-105 transition-transform duration-300">
                        Bienvenido <br />
                        de vuelta!<br />
                    </h2>
                </div>
            </div>
        </div>
    );
}