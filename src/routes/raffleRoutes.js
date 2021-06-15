const { Router } = require('express')
const router = Router()
const RaffleController = require('../controllers/raffleControllers')
const raffleValidation = require('../validation/raffleValidator.js')

const authMiddleware = require('../middleware/auth')

/**
 * @name getRaffles
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/raffles/getRaffleList
 */
router.get(
  '/getRaffles',
  [
    authMiddleware.authenticateToken,
    raffleValidation.getRaffleList
  ],
  RaffleController.getRaffleList
)

/**
 * @name getRaffleData
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/raffles/getRaffleData
 */
router.get(
  '/get/:id',
  [
    authMiddleware.authenticateToken,
    raffleValidation.getRaffleData
  ],
  RaffleController.getRaffleData
)

/**
 * @name createRaffle
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/raffles/createRaffle
 */
router.post(
  '/create',
  [
    authMiddleware.authenticateToken,
    raffleValidation.createRaffle
  ],
  RaffleController.createRaffle
)

/**
 * @name updateRaffle
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/raffles/updateRaffle
 */
router.put(
  '/update/:id',
  [
    authMiddleware.authenticateToken,
    raffleValidation.createRaffle
  ],
  RaffleController.updateRaffle
)

/**
 * @name deleteRaffle
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/raffles/deleteRaffle
 */
router.delete(
  '/delete/:id',
  [
    authMiddleware.authenticateToken,
    raffleValidation.getRaffleData
  ],
  RaffleController.deleteRaffle
)

module.exports = router
