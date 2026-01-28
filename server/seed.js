require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Profile = require('./models/Profile');

mongoose.connect(process.env.DB_URL).then(() => console.log('🔌 Conectando...'));

const seed = async () => {
    try {
        await User.deleteMany({});
        await Profile.deleteMany({});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("admin123", salt); 

        const admin = new User({
            email: "admin@admin.com",
            password: hashedPassword,
            role: "admin",
            name: "Super Admin"
        });
        await admin.save();

        const profile = new Profile({
            name: "Tu Nombre Completo",
            title: "Desarrollador Full Stack",
            description: "Descripción inicial editable desde el panel...",
            skills: ["React", "Node", "Mongo"],
            email: "contacto@test.com",
            github: "github.com/tuusuario"
        });
        await profile.save();

        console.log('✅ Admin y Perfil creados');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seed();