import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/auth/login', formData);
            login(res.data.token);
            navigate('/admin');
        } catch (err) {
            setError('Credenciales inválidas');
        }
    };

    return (
        <div className="flex justify-center items-center h-[80vh]">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96 border">
                <h2 className="text-2xl mb-4 font-bold text-center">Login Admin</h2>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full border p-2 mb-4 rounded"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    className="w-full border p-2 mb-4 rounded"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Entrar</button>
            </form>
        </div>
    );
};
export default Login;