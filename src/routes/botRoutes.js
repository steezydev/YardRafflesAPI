const { Router } = require('express')
const router = Router()

const botValidation = require('../validation/botValidator.js')
const BotController = require('../controllers/botControllers')

const botAuthMiddleware = require('../middleware/botAuth')

router.get(
  '/getUser/:telegramId',
  [
    botAuthMiddleware.checkKey,
    botValidation.getBotUser
  ],
  BotController.getBotUser
)

router.post(
  '/addUser',
  [
    botAuthMiddleware.checkKey,
    botValidation.addBotUser
  ],
  BotController.addBotUser
)

router.put(
  '/updateUser/:telegramId',
  [
    botAuthMiddleware.checkKey,
    botValidation.updateBotUser
  ],
  BotController.updateBotUser
)

router.get(
  '/getRafflesToPost',
  [
    botAuthMiddleware.checkKey
  ],
  BotController.getBotRafflesToPost
)

router.get(
  '/getCurrentRaffles',
  [
    botAuthMiddleware.checkKey
  ],
  BotController.getBotCurrentRaffles
)

router.get(
  '/getRaffle/:id',
  [
    botAuthMiddleware.checkKey
  ],
  BotController.getRaffle
)

router.post(
  '/addPartRaffle/:id',
  [
    botAuthMiddleware.checkKey,
    botValidation.addPartRaffle
  ],
  BotController.addPartRaffle
)

router.put(
  '/confirmParticipation/:id',
  [
    botAuthMiddleware.checkKey,
    botValidation.confirmParticipation
  ],
  BotController.confirmParticipation
)

router.put(
  '/confirmSuccess/:id',
  [
    botAuthMiddleware.checkKey,
    botValidation.confirmSuccess
  ],
  BotController.confirmSuccess
)

router.put(
  '/updateUser/:telegramId',
  [
    botAuthMiddleware.checkKey,
    botValidation.updateBotUser
  ],
  BotController.updateBotUser
)

router.get(
  '/getRafflesStats',
  [
    botAuthMiddleware.checkKey
  ],
  BotController.getRafflesStats
)

router.get(
  '/getUserRafflesStats/:telegramId',
  [
    botAuthMiddleware.checkKey,
    botValidation.getUserRafflesStats
  ],
  BotController.getUserRafflesStats
)

module.exports = router
