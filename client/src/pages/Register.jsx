import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';

const Register = () => {
    const [formData, setForm] = useState({ name: '', email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/auth/register', formData);
            login(res.data.token);
            navigate('/');
        } catch (err) { alert('Error al registrar'); }
    };

    return (
        <div className="flex justify-center mt-20">
            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Crear Cuenta</h2>
                <input className="w-full border p-2 mb-2" placeholder="Nombre" onChange={e=>setForm({...formData, name:e.target.value})} />
                <input className="w-full border p-2 mb-2" placeholder="Email" onChange={e=>setForm({...formData, email:e.target.value})} />
                <input className="w-full border p-2 mb-4" type="password" placeholder="Password" onChange={e=>setForm({...formData, password:e.target.value})} />
                <button className="w-full bg-blue-600 text-white p-2">Registrarse</button>
                <Link to="/login" className="block mt-2 text-sm text-blue-500">¿Ya tienes cuenta? Login</Link>
            </form>
        </div>
    );
};
export default Register;