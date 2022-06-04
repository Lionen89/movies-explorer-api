const router = require('express').Router(); // создали роутер
const { celebrate, Joi } = require('celebrate');
const { getCurrentUser, updateUser } = require('../controllers/users'); // импортировали контроллеры
// задали роуты
router.get('/users/me/', getCurrentUser);

router.patch('/users/me/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

module.exports = router; // экспортировали роуты
