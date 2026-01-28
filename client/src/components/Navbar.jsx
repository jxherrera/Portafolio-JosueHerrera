
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-gray-900 text-white p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-blue-400">MiPortafolio</Link>
                <div className="space-x-4">
                    <Link to="/" className="hover:text-blue-300">CV</Link>
                    <Link to="/blog" className="hover:text-blue-300">Blog</Link>
                    {user ? (
                        <>
                            <Link to="/admin" className="text-yellow-400 hover:text-yellow-300">Admin</Link>
                            <button onClick={logout} className="text-red-400 hover:text-red-300">Salir</button>
                        </>
                    ) : (
                        <Link to="/login" className="hover:text-blue-300">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};
export default Navbar;