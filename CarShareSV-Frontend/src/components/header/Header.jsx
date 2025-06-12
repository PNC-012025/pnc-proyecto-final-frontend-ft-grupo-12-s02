import Button from "../button/Button";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="max-w-8xl mx-auto px-4 py-3 flex justify-between items-center">
                <h1 className="text-xl font-bold text-primary">CarShareSV</h1>
                <nav className="flex gap-4 mr-12">
                    <Button href="/signin">
                        Registrarse
                    </Button>
                    <Button href="/login">
                        Iniciar sesión
                    </Button>
                </nav>
            </div>
        </header>
    );
}
