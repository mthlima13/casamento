const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middlewares Globais
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Importar rotas (serão criadas nos próximos passos)
// const routes = require('./routes');
// app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ouvindo na porta ${PORT}`);
});

module.exports = app;
