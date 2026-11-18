const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middlewares Globais
app.use(helmet());

// CORS: em produção, defina CORS_ORIGIN no .env com a URL do frontend
const corsOptions = process.env.CORS_ORIGIN
    ? { origin: process.env.CORS_ORIGIN.split(',') }
    : {};
app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(express.json());

// Conexão MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Importar rotas
const routes = require('./routes');
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ouvindo na porta ${PORT}`);
});

module.exports = app;
