const router = require('express').Router(); // создали роутер
const { celebrate, Joi } = require('celebrate');
// const validator = require('validator');
const { regularExpression } = require('../constants');
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies'); // импортировали контроллеры
// задали роуты
router.get('/movies/', getMovies);
router.post('/movies/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required()
      .regex(
        regularExpression,
      ),
    trailerLink: Joi.string().required()
      .regex(
        regularExpression,
      ),
    thumbnail: Joi.string().required()
      .regex(
        regularExpression,
      ),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);
router.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).required(),
  }),
}), deleteMovie);

module.exports = router; // экспортировали роуты
