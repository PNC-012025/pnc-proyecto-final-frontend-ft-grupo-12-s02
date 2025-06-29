import { useEffect } from "react";
import Header from "../../../components/header/Header";
import useUser from "../../../hooks/useUser";
import UserCard from "../../../components/cards/UserCard/UserCard";

export default function UsersList() {
    const {
        loading,
        getAllUsers,
        allUsers,
        user,
        activateUser,
        deactivateUser,
        grantAdminRole,
        revokeAdminRole
    } = useUser();

    useEffect(() => {
        getAllUsers();
    }, [getAllUsers]);

    const currentUserRoles = user?.roles || [];

    // Lógica para cambiar rol
    const handleToggleRole = (userId, isAdmin) => {
        if (isAdmin) {
            revokeAdminRole(userId);
        } else {
            grantAdminRole(userId);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <Header />
            <div className="max-w-4xl mx-auto pt-12 pb-16 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-semibold text-gray-900 mb-8">Usuarios Registrados</h1>
                <div className="space-y-4">
                    {loading ? (
                        <p className="text-gray-500">Cargando usuarios...</p>
                    ) : (
                        allUsers && allUsers.length > 0 ? (
                            allUsers.map((userItem) => (
                                <UserCard
                                    key={userItem.userId || userItem.id || userItem.username}
                                    user={userItem}
                                    currentUserRoles={currentUserRoles}
                                    onActivate={activateUser}
                                    onDeactivate={deactivateUser}
                                    onToggleRole={handleToggleRole}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500">No hay usuarios registrados.</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}