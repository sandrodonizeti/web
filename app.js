const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const dotenv = require('dotenv');
const checkLoggedIn = require('./middlewares/checkLoggedIn'); // Importa o middleware

// Rotas
const indexRouter = require('./routes/index');
const userRoutes = require('./routes/userRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const authRoutes = require('./routes/authRoutes');
const lojaRouter = require('./routes/lojaRoutes');

const app = express();

// Configuração de variáveis de ambiente
dotenv.config();

// Configuração de views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuração de sessão
app.use(session({
  secret: process.env.session_secret || 'default_secret', // Use o segredo do .env ou um padrão
  resave: false,
  saveUninitialized: true,
}));

// Rota de autenticação pública (não protegida)
app.use('/autenticacao', authRoutes);

// Proteger rotas a partir daqui
app.use(checkLoggedIn); // Aplica o middleware globalmente, exceto para rotas de autenticação

// Outras rotas protegidas
app.use('/', indexRouter);
app.use('/loja', lojaRouter);
app.use('/usuarios', userRoutes);
app.use('/clientes', clienteRoutes);

// Tratamento de erro 404
app.use(function (req, res, next) {
  next(createError(404));
});

// Tratamento de erros
app.use(function (err, req, res, next) {
  res.locals.error = {
    message: err.message,
    status: err.status || 500,
    stack: req.app.get('env') === 'development' ? err.stack : '',
  };

  res.status(res.locals.error.status);
  res.render('error');
});

module.exports = app;
