const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(() => {
      next(new Error('Произошла ошибка.'));
    });
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.findOne({ movieId })
    .then((movie) => {
      if (movie !== null) {
        return next(new ForbiddenError('Данный фильм уже в базе данных'));
      }
      return Movie.create({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
        owner,
      });
    })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании фильма.'));
      } else {
        next(new Error('Произошла ошибка.'));
      }
    });
};
module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const ownerId = req.user._id;
  Movie.findById({ _id: movieId })
    .then((movie) => {
      if (movie === null) {
        return next(new NotFoundError('Передан несуществующий _id фильма.'));
      }
      if (movie.owner.toHexString() !== ownerId) {
        return next(new ForbiddenError('Вы не можете удалить не свой фильм.'));
      }
      return movie.remove()
        .then(() => {
          res.send(movie);
        });
    })
    .catch((err) => {
      Error(`${err.message}`);
    });
};
