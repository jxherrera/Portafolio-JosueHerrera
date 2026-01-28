const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet'); 
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

app.use(helmet());

const corsOptions = {
    origin: ['http://localhost:5173', 'https://mi-portafolio.vercel.app'],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: "Demasiadas peticiones, intenta más tarde."
});
app.use(limiter);

app.use(express.json());

mongoose.connect(process.env.DB_URL)
    .then(() => console.log('✅ Conectado a MongoDB Atlas'))
    .catch((err) => console.error('❌ Error de conexión:', err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/profile', require('./routes/profile'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});