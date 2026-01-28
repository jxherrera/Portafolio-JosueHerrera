const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

router.post('/register', 
    [
        body('email', 'Incluye un email válido').isEmail(),
        body('password', 'El password debe tener 6+ caracteres').isLength({ min: 6 }),
        body('name', 'El nombre es obligatorio').not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, name } = req.body;

        try {

            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: 'El usuario ya existe' });
            }

            user = new User({ 
                email, 
                password, 
                name, 
                role: 'user' 
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = { 
                user: { 
                    id: user.id, 
                    role: user.role 
                } 
            };

            jwt.sign(
                payload, 
                process.env.JWT_SECRET, 
                { expiresIn: '5h' }, 
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Error del servidor');
        }
    }
);

router.post('/login',
    [
        body('email', 'Email inválido').isEmail(),
        body('password', 'Password requerido').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) return res.status(400).json({ msg: 'Credenciales Inválidas' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: 'Credenciales Inválidas' });

            const payload = { 
                user: { 
                    id: user.id,
                    role: user.role
                } 
            };
            
            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, 
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Error del servidor');
        }
    }
);

module.exports = router;