const { Router } = require('express')
const router = Router()

const botValidation = require('../validation/botValidator.js')
const BotController = require('../controllers/botControllers')

const botAuthMiddleware = require('../middleware/botAuth')

/**
 * @name getUser
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/admin/userAuthorization
 */
router.get(
  '/getUser/:telegramId',
  [
    botAuthMiddleware.checkKey,
    botValidation.getBotUser
  ],
  BotController.getBotUser
)

/**
 * @name addUser
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/bot/addBotUser
 */
router.post(
  '/addUser',
  [
    botAuthMiddleware.checkKey,
    botValidation.addBotUser
  ],
  BotController.addBotUser
)

/**
 * @name updateUser
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/bot/updateBotUser
 */
router.put(
  '/updateUser/:telegramId',
  [
    botAuthMiddleware.checkKey,
    botValidation.updateBotUser
  ],
  BotController.updateBotUser
)

/**
 * @name getRafflesToPost
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/bot/getBotRafflesToPost
 */
router.get(
  '/getRafflesToPost',
  [
    botAuthMiddleware.checkKey
  ],
  BotController.getBotRafflesToPost
)

/**
 * @name getCurrentRaffles
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/bot/getBotCurrentRaffles
 */
router.get(
  '/getCurrentRaffles',
  [
    botAuthMiddleware.checkKey,
    botValidation.getUserRafflesStats
  ],
  BotController.getBotCurrentRaffles
)

/**
 * @name getParticipatedRaffles
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/bot/getBotCurrPartRaffles
 */
 router.get(
  '/getCurrPartRaffles',
  [
    botAuthMiddleware.checkKey,
    botValidation.getUserRafflesStats
  ],
  BotController.getBotCurrPartRaffles
)

/**
 * @name getParticipatedRaffles
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/bot/getBotParticipatedRaffles
 */
 router.get(
  '/getParticipatedRaffles',
  [
    botAuthMiddleware.checkKey,
    botValidation.getUserRafflesStats
  ],
  BotController.getBotParticipatedRaffles
)

/**
 * @name getWonRaffles
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/bot/getBotWonRaffles
 */
 router.get(
  '/getWonRaffles',
  [
    botAuthMiddleware.checkKey,
    botValidation.getUserRafflesStats
  ],
  BotController.getBotWonRaffles
)

/**
 * @name getRaffle
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/bot/getRaffle
 */
router.get(
  '/getRaffle/:id',
  [
    botAuthMiddleware.checkKey,
    botValidation.addPartRaffle
  ],
  BotController.getRaffle
)

/**
 * @name addPartRaffle
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/bot/addPartRaffle
 */
router.post(
  '/addPartRaffle/:id',
  [
    botAuthMiddleware.checkKey,
    botValidation.addPartRaffle
  ],
  BotController.addPartRaffle
)

/**
 * @name removePartRaffle
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/bot/removePartRaffle
 */
 router.post(
  '/removePartRaffle/:id',
  [
    botAuthMiddleware.checkKey,
    botValidation.addPartRaffle
  ],
  BotController.removePartRaffle
)

/**
 * @name confirmParticipation
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/bot/confirmParticipation
 */
router.put(
  '/confirmParticipation/:id',
  [
    botAuthMiddleware.checkKey,
    botValidation.confirmParticipation
  ],
  BotController.confirmParticipation
)

/**
 * @name confirmSuccess
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/bot/confirmSuccess
 */
router.put(
  '/confirmSuccess/:id',
  [
    botAuthMiddleware.checkKey,
    botValidation.confirmSuccess
  ],
  BotController.confirmSuccess
)

/**
 * @name getRafflesStats
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/bot/getUserRafflesStats
 */
router.get(
  '/getRafflesStats',
  [
    botAuthMiddleware.checkKey
  ],
  BotController.getRafflesStats
)

/**
 * @name getUserRafflesStats
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/bot/getRafflesStats
 */
router.get(
  '/getUserRafflesStats/:telegramId',
  [
    botAuthMiddleware.checkKey,
    botValidation.getUserRafflesStats
  ],
  BotController.getUserRafflesStats
)

/**
 * @name checkPhone
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/bot/checkPhone
 */
 router.get(
  '/checkPhone',
  [
    botAuthMiddleware.checkKey,
    botValidation.checkPhone
  ],
  BotController.checkPhone
)

module.exports = router
