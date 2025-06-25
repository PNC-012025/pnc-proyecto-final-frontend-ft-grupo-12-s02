import Button from "../button/Button";
import useUser from "../../hooks/useUser";
import { Link } from "react-router-dom";

const ROLES = {
    SYSADMIN: 'ROLE_SYSADMIN',
    ADMIN: 'ROLE_ADMIN',
    USER: 'ROLE_USER'
};

export default function Header() {
    const { isLogged, user, logout } = useUser();

    const handleLogout = () => {
        logout();
        
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="max-w-8xl mx-auto px-4 py-3 flex justify-between items-center">
                <Link to={isLogged ? "/explore" : "/"} className="text-xl font-bold text-primary">CarShareSV</Link>
                <nav className="flex gap-4 mr-12 items-center">
                    {!isLogged ? (
                        <>
                            <Button href="/signin">
                                Registrarse
                            </Button>
                            <Button href="/login">
                                Iniciar sesión
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/explore" className="text-gray-700 hover:text-primary transition-colors">Explorar</Link>
                            <Link to="/post/new" className="text-gray-700 hover:text-primary transition-colors">Publicar</Link>
                            <Link to="/mycars" className="text-gray-700 hover:text-primary transition-colors">Mis Vehículos</Link>
                            <Link to="/rents/actuals" className="text-gray-700 hover:text-primary transition-colors">Mis Rentas</Link>
                            <Link to="/myprofile" className="text-gray-700 hover:text-primary transition-colors">Perfil</Link>
                            {(user?.data?.roles?.includes(ROLES.ADMIN) || user?.data?.roles?.includes(ROLES.SYSADMIN)) && (
                                <Link to="/admin/users" className="text-gray-700 hover:text-primary transition-colors">Usuarios</Link>
                            )}
                            <Button onClick={handleLogout} type="button">
                                Cerrar sesión
                            </Button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
