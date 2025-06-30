import { FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaUserShield, FaUserCog, FaUserTie } from "react-icons/fa";
import Button from "../../button/Button";

const roleIcons = {
    "ROLE_USER": <FaUser className="text-primary" title="Usuario" />,
    "ROLE_ADMIN": <FaUserCog className="text-blue-500" title="Admin" />,
    "ROLE_SYSADMIN": <FaUserTie className="text-yellow-500" title="SysAdmin" />
};

export default function UserCard({ user, currentUserRoles, onActivate, onDeactivate, onToggleRole }) {
    const isActive = user.active !== false;
    const isAdmin = user.roles?.includes("ROLE_ADMIN");
    const isSysAdmin = currentUserRoles?.includes("ROLE_SYSADMIN");
    const isCurrentAdmin = currentUserRoles?.includes("ROLE_ADMIN");

    return (
        <div className="flex items-stretch">

            <div className="flex bg-white rounded-xl shadow-sm border border-gray-200 p-10 mb-6 items-center hover:shadow-md transition-shadow duration-200 flex-1 h-[180px]">
                <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mr-6">
                    <FaUser className="text-3xl text-primary" />
                </div>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2">
                    <div>
                        <span className="text-gray-500 text-xs">Nombre</span>
                        <div className="font-semibold text-gray-900">{user.firstName} {user.lastName}</div>
                    </div>
                    <div>
                        <span className="text-gray-500 text-xs">Usuario</span>
                        <div className="text-gray-800">{user.username}</div>
                    </div>
                    <div>
                        <span className="text-gray-500 text-xs">Correo</span>
                        <div className="flex items-center gap-1 text-gray-800">
                            <FaEnvelope className="text-primary" /> {user.email}
                        </div>
                    </div>
                    <div>
                        <span className="text-gray-500 text-xs">Teléfono</span>
                        <div className="flex items-center gap-1 text-gray-800">
                            <FaPhone className="text-primary" /> {user.phoneNumber}
                        </div>
                    </div>
                    <div>
                        <span className="text-gray-500 text-xs">Nacimiento</span>
                        <div className="flex items-center gap-1 text-gray-800">
                            <FaBirthdayCake className="text-primary" /> {user.birthdate}
                        </div>
                    </div>
                    <div>
                        <span className="text-gray-500 text-xs">Rol</span>
                        <div className="flex flex-wrap items-center gap-2 text-gray-800">
                            {user.roles?.length
                                ? user.roles.map((role, idx) => (
                                    <span key={role} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                                        {roleIcons[role] || <FaUserShield className="text-gray-400" />}
                                        {role.replace("ROLE_", "")}
                                    </span>
                                ))
                                : (
                                    <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                                        <FaUser className="text-primary" /> Usuario
                                    </span>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2 ml-6 justify-center">
                {(isCurrentAdmin || isSysAdmin) && (
                    isActive ? (
                        <Button
                            onClick={async () => {
                                await onDeactivate(user.userId || user.id);
                                window.location.reload();
                            }}
                        >
                            Desactivar
                        </Button>
                    ) : (
                        <Button
                            onClick={async () => {
                                await onActivate(user.userId || user.id);
                                window.location.reload();
                            }}
                        >
                            Activar
                        </Button>
                    )
                )}
                {isSysAdmin && (
                    <Button
                        onClick={async () => {
                            await onToggleRole(user.userId || user.id, isAdmin);
                            window.location.reload();
                        }}
                        disabled={user.roles?.includes("ROLE_SYSADMIN")}
                        title={user.roles?.includes("ROLE_SYSADMIN") ? "No puedes cambiar el rol de un SYSADMIN" : ""}
                    >
                        {isAdmin ? "Hacer Usuario" : "Hacer Admin"}
                    </Button>
                )}
            </div>
        </div>
    );
}