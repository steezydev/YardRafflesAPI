const { check, body, validationResult } = require('express-validator');

exports.getAnnounceById = [
  check('id').exists().isInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    else next();
  }
];

exports.createAnnounce = [
  check('title').exists().notEmpty().isString(),
  check('work_name').exists().notEmpty().isString(),
  check('images').isString(),
  check('message').exists().notEmpty().isString(),
  check('publication_date').isString(),
  check('tags').isArray(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    else next();
  }
];