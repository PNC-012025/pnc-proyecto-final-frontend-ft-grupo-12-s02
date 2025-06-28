import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import useSignIn from '../../hooks/useSignIn';
import Alert from '../../components/alerts/alert';

export default function SignIn() {
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [redirectOnClose, setRedirectOnClose] = useState(false);
    const navigate = useNavigate();

    const { isLoading, hasError, registerUser, isLogged } = useSignIn();

    useEffect(() => {
        if(isLogged) {
            navigate('/explore');
        } else if (!isLogged && hasError){
            setAlertMessage("Hubo error en el registro");
            setAlertOpen(true)
        }
    }, [isLogged, hasError, navigate]);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        birthdate: '',
        email: '',
        phoneNumber: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validate = (fieldValues = formData) => {
        const newErrors = {};

        if (!fieldValues.firstName.trim()) newErrors.firstName = 'El nombre es requerido';

        if (!fieldValues.lastName.trim()) newErrors.lastName = 'El apellido es requerido';

        if (!fieldValues.username.trim()) {
            newErrors.username = 'El nombre de usuario es requerido.';
        } else if (fieldValues.username.length < 3 || fieldValues.username.length > 12) {
            newErrors.username = 'Formato de nombre de usuario inválido.';
        }

        const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/;
        if (!fieldValues.password.trim()) {
            newErrors.password = 'La contraseña es requerida';
        } else if (!passwordRegex.test(fieldValues.password)) {
            newErrors.password = 'Formato de contraseña inválido.';
        }

    
        const birthdateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!fieldValues.birthdate.trim()) {
            newErrors.birthdate = 'La fecha de nacimiento es requerida.';
        } else if (!birthdateRegex.test(fieldValues.birthdate)) {
            newErrors.birthdate = 'Ingresa una fecha válida.';
        }

        const phoneRegex = /^\d{8}$/;
        if (!fieldValues.phoneNumber.trim()) {
            newErrors.phoneNumber = 'El número de teléfono es requerido';
        } else if (!phoneRegex.test(fieldValues.phoneNumber)) {
            newErrors.phoneNumber = 'El número de teléfono debe tener 8 dígitos';
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!fieldValues.email.trim()) {
            newErrors.email = 'El correo electrónico es requerido';
        } else if (!emailRegex.test(fieldValues.email)) {
            newErrors.email = 'Correo electrónico inválido';
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedForm = { ...formData, [name]: value };
        setFormData(updatedForm);
        setErrors(validate(updatedForm));
        setTouched((prev) => ({ ...prev, [name]: true }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({ ...touched, [name]: true });
        setErrors(validate(formData));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        setTouched({
            firstName: true,
            lastName: true,
            username: true,
            birthdate: true,
            email: true,
            phoneNumber: true,
            password: true
        });
        if (Object.keys(validationErrors).length > 0) {
            setAlertMessage(
                Object.values(validationErrors).join('\n')
            );
            setAlertOpen(true);
            setRedirectOnClose(false);
            return;
        }
        try {
            await registerUser(formData);
        } catch {
            setAlertMessage("Ocurrió un error al registrarse. Intenta de nuevo.");
            setAlertOpen(true);
            setRedirectOnClose(false);
        }

    };

    const handleAlertClose = () => {
        setAlertOpen(false);
        if (redirectOnClose) {
            navigate('/login');
        }
    };

    return (
        <div className="h-screen flex">
            <div className="w-3/5 bg-white flex items-center justify-center p-8 h-full">
                <div className="w-full max-w-md">
                    <h1 className="text-5xl font-bold text-primary mb-8 text-center">Regístrate</h1>
                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        <div>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Nombre"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full px-4 py-3 border ${errors.firstName && touched.firstName ? 'border-red-500' : 'border-gray-300'} rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300`}
                                required
                                value={formData.firstName}
                            />
                            {errors.firstName && touched.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Apellido"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full px-4 py-3 border ${errors.lastName && touched.lastName ? 'border-red-500' : 'border-gray-300'} rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300`}
                                required
                                value={formData.lastName}
                            />
                            {errors.lastName && touched.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                        </div>
                        <div>
                            <input
                                type="text"
                                name="username"
                                placeholder="Nombre de usuario"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full px-4 py-3 border ${errors.username && touched.username ? 'border-red-500' : 'border-gray-300'} rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300`}
                                required
                                value={formData.username}
                            />
                            {errors.username && touched.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                        </div>
                        <div>
                            <input
                                type="date"
                                name="birthdate"
                                placeholder="Fecha de nacimiento"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full px-4 py-3 border ${errors.birthdate && touched.birthdate ? 'border-red-500' : 'border-gray-300'} rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300`}
                                required
                                value={formData.birthdate}
                            />
                            {errors.birthdate && touched.birthdate && <p className="text-red-500 text-xs mt-1">{errors.birthdate}</p>}
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Correo electrónico"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full px-4 py-3 border ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'} rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300`}
                                required
                                value={formData.email}
                            />
                            {errors.email && touched.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div>
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="Número de teléfono"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full px-4 py-3 border ${errors.phoneNumber && touched.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300`}
                                required
                                value={formData.phoneNumber}
                            />
                            {errors.phoneNumber && touched.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Contraseña"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full px-4 py-3 border ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'} rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300`}
                                required
                                value={formData.password}
                            />
                            {errors.password && touched.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>
                        <div className="text-center mt-6">
                            <p className="text-gray-500 text-sm mb-4">
                                ¿Ya tienes cuenta?{' '}
                                <a href="/login" className="text-primary hover:underline">
                                    Inicia sesión aquí
                                </a>
                            </p>
                            <Button type="submit" className="px-8 py-3" disabled={isLoading}>
                                Registrarse
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="w-2/5 bg-gradient-to-br from-primary to-secondary via-[#7a2c7d] flex items-center justify-center text-white h-full">
                <div className="text-center px-8">
                    <h2 className="text-6xl font-bold leading-tight hover:scale-105 transition-transform duration-300">
                        Bienvenido a<br />
                        nuestra familia!<br />
                    </h2>
                </div>
            </div>
            <Alert
                message={alertMessage}
                isOpen={alertOpen}
                onClose={handleAlertClose}
            />
        </div>
    );
}