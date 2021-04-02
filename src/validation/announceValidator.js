const { check, body, validationResult } = require('express-validator');

exports.getAnnouncesList = [
  check('page').exists().isInt(),
  check('limit').optional().isInt(),
  check('sort').optional().isString().trim().escape(),
  check('sort_dir').optional().isString().trim().escape(),
  check('search').optional().isString().trim().escape(),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    else next();
  }
];

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
  check('title').exists().notEmpty().isString().trim().escape(),
  check('work_name').exists().notEmpty().isString().trim().escape(),
  check('images').isString().trim().escape(),
  check('message').exists().notEmpty().isString().trim().escape(),
  check('publication_date').isString().trim().escape(),
  check('tags').isArray(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    else next();
  }
];