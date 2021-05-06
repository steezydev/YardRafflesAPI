const { check, validationResult } = require('express-validator')

exports.getUserList = [
  check('page').optional().isInt(),
  check('limit').optional().isInt(),
  check('sort').optional().isString().trim().escape(),
  check('sort_dir').optional().isString().trim().escape(),
  check('search').optional().isString().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    } else next()
  }
]

exports.checkId = [
  check('id').exists().isInt(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    } else next()
  }
]

exports.checkBlockUser = [
  check('id').exists().isInt(),
  check('reason').exists().notEmpty().isString().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    } else next()
  }
]
