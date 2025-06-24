import { useEffect, useState } from 'react';
import Button from '../../components/button/Button';
import useSignIn from '../../hooks/useSignIn';

export default function SignIn() {
    const { isLoading, hasError, registerUser } = useSignIn();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '', 
        birthdate: '',
        email: '',
        phoneNumber: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos del formulario:', formData);
        
        registerUser(formData);
    };

    useEffect(() => {
        if (hasError) console.log("ERROR EN REGISTRO"); // TO-DO: navigate to error page
    }, [hasError]);

      return (
        <div className="h-screen flex">
            {/*Izquierda */}
            <div className="w-3/5 bg-white flex items-center justify-center p-8 h-full">
                <div className="w-full max-w-md">
                    <h1 className="text-5xl font-bold text-primary mb-8 text-center">Regístrate</h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Nombre"
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Apellido"
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
                                required
                            />
                        </div>
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
                                type="text"
                                name="birthdate"
                                placeholder="Fecha de nacimiento (AAAA-MM-DD)"
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Correo electrónico"
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="tel"
                                name="phoneNumber"
                                placeholder="Número de teléfono"
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
                                Ya tienes cuenta?{' '}
                                <a href="/login" className="text-primary hover:underline">
                                    Inicia sesión aquí
                                </a>
                            </p>
                            <Button type="submit" className="px-8 py-3">
                                Registrarse
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            {/*Derecha*/}
            <div className="w-2/5 bg-gradient-to-br from-primary to-secondary via-[#7a2c7d] flex items-center justify-center text-white h-full">
                <div className="text-center px-8">
                    <h2 className="text-6xl font-bold leading-tight hover:scale-105 transition-transform duration-300">
                        Bienvenido a<br />
                        nuestra familia!<br />
                    </h2>
                </div>
            </div>
        </div>
    );
}
