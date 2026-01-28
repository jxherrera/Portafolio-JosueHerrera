import { useState, useEffect } from 'react';
import axios from '../api/axios';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const [posts, setPosts] = useState([]);
    const [profileForm, setProfileForm] = useState({ 
        name: '', title: '', description: '', skills: '', email: '', github: '',
        education: '', experience: '', certifications: '', languages: ''
    });

    const fetchData = async () => {
        try {
            const resPosts = await axios.get('/posts');
            setPosts(resPosts.data);
            const resProfile = await axios.get('/profile');
            if (resProfile.data) {
                setProfileForm({
                    ...resProfile.data,
                    skills: resProfile.data.skills ? resProfile.data.skills.join(', ') : ''
                });
            }
        } catch (error) {
            console.error(error);
            toast.error("Error cargando datos");
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const skillsArray = profileForm.skills.split(',').map(s => s.trim());
            await axios.put('/profile', { ...profileForm, skills: skillsArray });
            toast.success('Perfil actualizado correctamente');
        } catch (error) { 
            toast.error('Error actualizando perfil'); 
        }
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
            const newPost = {
                title: e.target.title.value,
                category: e.target.category.value,
                content: e.target.content.value
            };
            await axios.post('/posts', newPost);
            toast.success('¡Nuevo post publicado!');
            e.target.reset();
            fetchData(); 
        } catch (error) { toast.error('Error al publicar'); }
    };

    const handleDelete = async (id) => {
        if(confirm('¿Borrar este post?')) {
            try { await axios.delete(`/posts/${id}`); fetchData(); toast.success('Eliminado'); } 
            catch { toast.error('Error'); }
        }
    };

    const inputStyle = "w-full border p-2 rounded focus:ring-2 ring-blue-100 outline-none text-sm";
    const labelStyle = "text-xs font-bold text-gray-500 uppercase tracking-wide mt-2 block";

    return (
        <div className="container mx-auto p-6 pb-20">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Panel de Control</h1>

            <div className="grid lg:grid-cols-2 gap-8">
                
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 h-fit">
                    <h2 className="text-xl font-bold mb-4 text-blue-600 border-b pb-2">Editar Hoja de Vida</h2>
                    <form onSubmit={handleProfileUpdate} className="space-y-3">
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelStyle}>Nombre</label>
                                <input className={inputStyle} value={profileForm.name} onChange={e=>setProfileForm({...profileForm, name:e.target.value})} />
                            </div>
                            <div>
                                <label className={labelStyle}>Título</label>
                                <input className={inputStyle} value={profileForm.title} onChange={e=>setProfileForm({...profileForm, title:e.target.value})} />
                            </div>
                        </div>

                        <label className={labelStyle}>Perfil Profesional</label>
                        <textarea rows="3" className={inputStyle} value={profileForm.description} onChange={e=>setProfileForm({...profileForm, description:e.target.value})} />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelStyle}>Educación</label>
                                <textarea rows="4" placeholder="Ej: Ing. Software - Universidad X (2025)" className={inputStyle} value={profileForm.education} onChange={e=>setProfileForm({...profileForm, education:e.target.value})} />
                            </div>
                            <div>
                                <label className={labelStyle}>Experiencia</label>
                                <textarea rows="4" placeholder="Ej: Desarrollador Junior - Empresa Y" className={inputStyle} value={profileForm.experience} onChange={e=>setProfileForm({...profileForm, experience:e.target.value})} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelStyle}>Certificados</label>
                                <textarea rows="2" className={inputStyle} value={profileForm.certifications} onChange={e=>setProfileForm({...profileForm, certifications:e.target.value})} />
                            </div>
                            <div>
                                <label className={labelStyle}>Idiomas</label>
                                <textarea rows="2" placeholder="Ej: Español (Nativo), Inglés (B2)" className={inputStyle} value={profileForm.languages} onChange={e=>setProfileForm({...profileForm, languages:e.target.value})} />
                            </div>
                        </div>

                        <label className={labelStyle}>Habilidades (separar por comas)</label>
                        <input className={inputStyle} value={profileForm.skills} onChange={e=>setProfileForm({...profileForm, skills:e.target.value})} />

                        <div className="grid grid-cols-2 gap-4">
                            <input className={inputStyle} placeholder="Email" value={profileForm.email} onChange={e=>setProfileForm({...profileForm, email:e.target.value})} />
                            <input className={inputStyle} placeholder="GitHub" value={profileForm.github} onChange={e=>setProfileForm({...profileForm, github:e.target.value})} />
                        </div>

                        <button className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 font-bold mt-4">Guardar Cambios</button>
                    </form>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 text-green-600 border-b pb-2">Escribir Artículo</h2>
                        <form onSubmit={handlePostSubmit} className="space-y-3">
                            <input name="title" placeholder="Título" required className={inputStyle}/>
                            <select name="category" className={inputStyle}>
                                <option>Tecnología</option><option>Tutorial</option><option>Carrera</option>
                            </select>
                            <textarea name="content" placeholder="Contenido..." required rows="4" className={inputStyle}></textarea>
                            <button className="w-full bg-green-600 text-white py-2 rounded font-bold">Publicar</button>
                        </form>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                         <h2 className="text-xl font-bold mb-4 text-gray-700">Posts Recientes</h2>
                         <div className="max-h-60 overflow-y-auto space-y-2">
                            {posts.map(p => (
                                <div key={p._id} className="flex justify-between p-3 border rounded hover:bg-gray-50">
                                    <span className="font-bold text-sm truncate w-2/3">{p.title}</span>
                                    <button onClick={() => handleDelete(p._id)} className="text-red-500 text-xs border border-red-200 px-2 rounded">Borrar</button>
                                </div>
                            ))}
                         </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default AdminDashboard;