const { Router } = require('express')
const router = Router()
const AnnounceController = require('../controllers/announceControllers')
const announceValidation = require('../validation/announceValidator.js')

const authMiddleware = require('../middleware/auth')

router.get(
  '/getAnnounces',
  [
    authMiddleware.authenticateToken,
    announceValidation.getAnnouncesList
  ],
  AnnounceController.getAllAnnounces
)

router.get(
  '/get/:id',
  [
    authMiddleware.authenticateToken,
    announceValidation.getAnnounceById
  ],
  AnnounceController.getAnnounceById
)

router.post(
  '/create',
  [
    authMiddleware.authenticateToken,
    announceValidation.createAnnounce
  ],
  AnnounceController.createAnnounce
)

router.put(
  '/update/:id',
  [
    authMiddleware.authenticateToken,
    announceValidation.createAnnounce
  ],
  AnnounceController.updateAnnounce
)

router.delete(
  '/delete/:id',
  [
    authMiddleware.authenticateToken,
    announceValidation.getAnnounceById
  ],
  AnnounceController.deleteAnnounce
)

module.exports = router
