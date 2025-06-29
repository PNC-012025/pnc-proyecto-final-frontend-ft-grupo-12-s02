import Button from "../button/Button";
import useUser from "../../hooks/useUser";
import { Link, useLocation } from "react-router-dom";

const ROLES = {
    SYSADMIN: 'ROLE_SYSADMIN',
    ADMIN: 'ROLE_ADMIN',
    USER: 'ROLE_USER'
};

export default function Header() {
    const { isLogged, user } = useUser();
    const roles = user?.roles || [];
    const location = useLocation();

    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="max-w-8xl mx-auto pl-10 py-6 flex items-center justify-between h-20">
                <Link to={isLogged ? "/explore" : "/"} className="text-xl font-bold text-primary">
                    CarShareSV
                </Link>

                {isLogged && (
                       <nav className="flex-1 flex justify-center gap-6 text-lg">
                        <Link
                            to="/explore"
                            className={`transition-colors ${isActive("/explore") ? "text-primary" : "text-gray-700"} hover:text-primary`}
                        >
                            Explorar
                        </Link>
                        <Link
                            to="/post/new"
                            className={`transition-colors ${isActive("/post/new") ? "text-primary" : "text-gray-700"} hover:text-primary`}
                        >
                            Publicar
                        </Link>
                        <Link
                            to="/mycars"
                            className={`transition-colors ${isActive("/mycars") ? "text-primary" : "text-gray-700"} hover:text-primary`}
                        >
                            Mis vehículos
                        </Link>
                        <Link
                            to="/rents/actuals"
                            className={`transition-colors ${isActive("/rents/actuals") ? "text-primary" : "text-gray-700"} hover:text-primary`}
                        >
                            Mis rentas
                        </Link>

                         {(roles.includes(ROLES.ADMIN) || roles.includes(ROLES.SYSADMIN)) && (
                                <Link to="/admin/users" className={`transition-colors ${isActive("/admin/users") ? "text-primary" : "text-gray-700"} hover:text-primary`}>Usuarios</Link>
                            )}

                    </nav>
                )}

                {/* Derecha */}
                <div className="flex gap-4 items-center ml-auto">
                    {!isLogged ? (
                        <>
                            <div className="mr-10 flex gap-x-4">
                                <Button href="/signin">Registrarse</Button>
                                <Button href="/login">Iniciar sesión</Button>
                            </div>


                        </>
                    ) : (
                        <>
    
                             <Link to="/myprofile" className={`transition-colors ${isActive("/myprofile") ? "text-primary" : "text-gray-700"} hover:text-primary mr-10 text-lg`}>Perfil</Link>
                           
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
