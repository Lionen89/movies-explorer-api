const router = require('express').Router(); // создали роутер
const { celebrate, Joi } = require('celebrate');
const { getCurrentUser, updateUser } = require('../controllers/users'); // импортировали контроллеры
// задали роуты
router.get('/me', getCurrentUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
  }),
}), updateUser);

module.exports = router; // экспортировали роуты
