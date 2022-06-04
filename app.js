/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { limiter } = require('./middlewares/limiter');
const NotFoundError = require('./errors/not-found-err');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandler');

const {
  PORT = 3000,
} = process.env;

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

mongoose.connect(process.env.NODE_ENV === 'production' ? 'mongodb://51.250.89.10:27017/moviesdb'
  : 'mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
}, (err) => {
  if (err) throw err;
  console.log('Connected to MongoDB!');
});

app.use(requestLogger); // подключаем логгер запросов
app.use(cors());
app.use(helmet());
app.use(limiter);

app.use(require('./routes/auth'));

app.use(auth);

app.use(require('./routes/users'));

app.use(require('./routes/movies'));

app.use('*', () => {
  throw new NotFoundError('Страницы по данному адресу не существует');
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
