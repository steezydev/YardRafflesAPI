const { check, body, validationResult } = require('express-validator');

exports.singUp = [
  check('username').exists().notEmpty().isString(),
  check('email').exists().notEmpty().isString(),
  check('password').exists().notEmpty().isString(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    else next();
  }
];

exports.singIn = [
  check('email').exists().notEmpty().isString(),
  check('password').exists().notEmpty().isString(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    else next();
  }
];