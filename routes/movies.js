const router = require('express').Router(); // создали роутер
const { celebrate, Joi } = require('celebrate');
const { regularExpression } = require('../constants');
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies'); // импортировали контроллеры
// задали роуты
router.get('/', getMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required()
      .regex(regularExpression),
    trailerLink: Joi.string().required()
      .regex(regularExpression),
    thumbnail: Joi.string().required()
      .regex(regularExpression),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required(),
  }),
}), deleteMovie);

module.exports = router; // экспортировали роуты
