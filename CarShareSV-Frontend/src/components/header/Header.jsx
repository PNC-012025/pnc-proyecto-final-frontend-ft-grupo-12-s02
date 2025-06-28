import Button from "../button/Button";
import useUser from "../../hooks/useUser";
import { Link } from "react-router-dom";

const ROLES = {
    SYSADMIN: 'ROLE_SYSADMIN',
    ADMIN: 'ROLE_ADMIN',
    USER: 'ROLE_USER'
};

export default function Header() {
    const { isLogged, user } = useUser();
    const roles = user?.roles || [];

    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="max-w-8xl mx-auto pl-10 py-6 flex items-center justify-between h-20">
                <Link to={isLogged ? "/explore" : "/"} className="text-xl font-bold text-primary">
                    CarShareSV
                </Link>

                {isLogged && (
                    <nav className="flex-1 flex justify-center gap-6 text-lg">
                        <Link to="/explore" className="text-gray-700 hover:text-primary transition-colors">Explorar</Link>
                        <Link to="/post/new" className="text-gray-700 hover:text-primary transition-colors">Publicar</Link>
                        <Link to="/mycars" className="text-gray-700 hover:text-primary transition-colors">Mis Vehículos</Link>
                        <Link to="/rents/actuals" className="text-gray-700 hover:text-primary transition-colors">Mis Rentas</Link>
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
                            <Link to="/myprofile" className="text-gray-700 hover:text-primary transition-colors mr-10 text-lg">Perfil</Link>
                            {(roles.includes(ROLES.ADMIN) || roles.includes(ROLES.SYSADMIN)) && (
                                <Link to="/admin/users" className="text-gray-700 hover:text-primary transition-colors text-lg">Usuarios</Link>
                            )}
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
