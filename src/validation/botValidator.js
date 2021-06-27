const { check, validationResult } = require('express-validator')

exports.getBotUser = [
  check('telegramId').optional().isString().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    } else next()
  }
]

exports.addBotUser = [
  check('username').exists().isString().trim().escape(),
  check('telegramLink').exists().isString().trim().escape(),
  check('phone').optional().isString().trim().escape(),
  check('email').optional().isString().trim().escape(),
  check('telegramId').exists().isNumeric().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    } else next()
  }
]

exports.updateBotUser = [
  check('username').exists().isString().trim().escape(),
  check('telegramLink').exists().isString().trim().escape(),
  check('phone').optional().isString().trim().escape(),
  check('email').optional().isString().trim().escape(),
  check('telegramId').exists().isString().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    } else next()
  }
]

exports.getUserRafflesStats = [
  check('telegramId').exists().isString().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    } else next()
  }
]

exports.checkPhone = [
  check('phone').exists().isString().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    } else next()
  }
]

exports.getRaffle = [
  check('id').exists().isInt(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    } else next()
  }
]

exports.addPartRaffle = [
  check('id').exists().isInt(),
  check('telegramId').exists().isString().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    } else next()
  }
]

exports.confirmParticipation = [
  check('id').exists().isInt(),
  check('telegramId').exists().isString().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    } else next()
  }
]

exports.confirmSuccess = [
  check('id').exists().isInt(),
  check('telegramId').exists().isString().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    } else next()
  }
]
