import Header from "../../../components/header/Header";

export default function UsersList() {
    return (
        <div className="min-h-screen bg-gray-50 flex p-4 mt-20">
        <Header />
        <div className="w-full max-w-2xl pt-12 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Lista de Usuarios</h1>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Usuario 1</li>
                    <li>Usuario 2</li>
                    <li>Usuario 3</li>
                    <li>Usuario 4</li>
                    <li>Usuario 5</li>
                    <li>Usuario 6</li>
                    <li>Usuario 7</li>
                    <li>Usuario 8</li>
                    <li>Usuario 9</li>
                    <li>Usuario 10</li>
                </ul>
            </div>
            </div>
        </div>
        </div>
    );
    }