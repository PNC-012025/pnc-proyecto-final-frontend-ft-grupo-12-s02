import { useState, useEffect } from 'react';
import Button from '../../components/button/Button';
import useUser from '../../hooks/useUser';

const ROLES = {
    SYSADMIN: 'ROLE_SYSADMIN',
    ADMIN: 'ROLE_ADMIN',
    USER: 'ROLE_USER'
}

export default function Login() {
    const { isLogged, isLoginLoading, hasLoginError, login, user } = useUser();  
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    useEffect(() => {
      if (hasLoginError) console.log("ERROR EN LOGIN"); //TODO -navigate("/LoginError");

      console.log("IS LOGGED: " + isLogged + "\nUSER: " + JSON.stringify(user)); // debugging

      if (isLogged) {
        if (user?.roles?.includes(ROLES.ADMIN)) console.log("NAVEGAR A VISTA ADMIN"); //TODO - navigate("/Admin/AdminHome");
        if (user?.roles?.includes(ROLES.SYSADMIN)) console.log("NAVEGAR A VISTA ADMIN"); //TODO - navigate("/Admin/AdminHome");
        if (user?.roles?.includes(ROLES.USER)) console.log("NAVEGAR A VISTA USUARIO"); //TODO - navigate("/user/UserHome");
      }
    }, [hasLoginError, isLogged, user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos del formulario:', formData);
        
        login(formData);
    };

    return (
        <div className="h-screen flex">
            {/*Izquierda */}
            { isLoginLoading && <strong>Validando credenciales...</strong> }
            {!isLoginLoading && (
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
                            />
                        </div>
                        <div className="text-center mt-6">
                            <p className="text-gray-500 text-sm mb-4">
                                No tienes una cuenta?{' '}
                                <a href="/signin" className="text-primary hover:underline">
                                    Regístrate aquí
                                </a>
                            </p>
                            <Button type="submit" className="px-8 py-3">
                                Iniciar sesión
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            )}
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
