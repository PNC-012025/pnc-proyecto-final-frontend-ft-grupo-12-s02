import { Link } from 'react-router-dom'; 

export default function Button({ children, onClick, className, href }) {
    const buttonClass = `px-4 py-2 text-white bg-primary border border-primary rounded-full 
                         transition-colors duration-300 ease-in-out 
                         hover:bg-white hover:text-primary hover:border-primary ${className}`;

    if (href) {
        return (
            <Link to={href} className={buttonClass}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={buttonClass}>
            {children}
        </button>
    );
}
