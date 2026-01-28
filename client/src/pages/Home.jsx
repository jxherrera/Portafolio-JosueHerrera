import { useEffect, useState } from 'react';
import axios from '../api/axios';

const Home = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get('/profile').then(res => setProfile(res.data)).catch(() => {});
  }, []);

  if (!profile) return <div className="text-center mt-20">Cargando portafolio...</div>;

  const Section = ({ title, content }) => (
    content ? (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">{title}</h2>
        <div className="text-gray-600 whitespace-pre-line leading-relaxed">
          {content}
        </div>
      </div>
    ) : null
  );

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <header className="text-center mb-12 py-10 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl shadow-lg">
        <h1 className="text-5xl font-bold mb-2">{profile.name}</h1>
        <p className="text-xl opacity-90 font-light">{profile.title}</p>
        <div className="mt-6 flex justify-center gap-4 text-sm font-semibold">
           {profile.email && <span className="bg-white/20 px-3 py-1 rounded-full">{profile.email}</span>}
           {profile.github && <span className="bg-white/20 px-3 py-1 rounded-full">{profile.github}</span>}
        </div>
      </header>
      
      <Section title="👤 Perfil Profesional" content={profile.description} />

      <div className="grid md:grid-cols-2 gap-6">
        <Section title="💼 Experiencia Laboral" content={profile.experience} />
        <div className="space-y-6">
            <Section title="🎓 Educación" content={profile.education} />
            <Section title="🏆 Certificaciones" content={profile.certifications} />
            <Section title="🗣️ Idiomas" content={profile.languages} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">🛠️ Habilidades Técnicas</h2>
        <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
                <span key={index} className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-sm font-semibold">
                    {skill}
                </span>
            ))}
        </div>
      </div>
      
    </div>
  );
};
export default Home;