const { Router } = require('express')
const router = Router()
const AnnounceController = require('../controllers/announceControllers')
const announceValidation = require('../validation/announceValidator.js')

const authMiddleware = require('../middleware/auth')

/**
 * @name getAnnounces
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/announcements/getAnnounceList
 */
router.get(
  '/getAnnounces',
  [
    authMiddleware.authenticateToken,
    announceValidation.getAnnouncesList
  ],
  AnnounceController.getAllAnnounces
)

/**
 * @name getAnnounceData
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/announcements/getAnnounceData
 */
router.get(
  '/get/:id',
  [
    authMiddleware.authenticateToken,
    announceValidation.getAnnounceById
  ],
  AnnounceController.getAnnounceById
)

/**
 * @name createAnnounce
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/announcements/createAnnounce
 */
router.post(
  '/create',
  [
    authMiddleware.authenticateToken,
    announceValidation.createAnnounce
  ],
  AnnounceController.createAnnounce
)

/**
 * @name updateAnnounce
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/announcements/updateAnnounce
 */
router.put(
  '/update/:id',
  [
    authMiddleware.authenticateToken,
    announceValidation.createAnnounce
  ],
  AnnounceController.updateAnnounce
)

/**
 * @name deleteAnnounce
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/announcements/deleteAnnounce
 */
router.delete(
  '/delete/:id',
  [
    authMiddleware.authenticateToken,
    announceValidation.getAnnounceById
  ],
  AnnounceController.deleteAnnounce
)

module.exports = router
