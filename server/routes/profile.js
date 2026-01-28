const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile'); 

router.get('/', async (req, res) => {
    try {
        const profile = await Profile.findOne();
        
        if (!profile) {
            return res.json({
                name: "Tu Nombre",
                title: "Desarrollador Web",
                description: "Bienvenido a mi portafolio. Aún no he configurado mi perfil.",
                skills: ["React", "Node"],
                email: "correo@ejemplo.com",
                github: "github.com"
            });
        }
        
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del Servidor');
    }
});

router.put('/', async (req, res) => {
    try {
        const profile = await Profile.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.json(profile);
    } catch (err) {
        res.status(500).send('Error');
    }
});

module.exports = router;