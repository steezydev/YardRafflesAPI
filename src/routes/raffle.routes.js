const { Router } = require('express')
const router = Router();
const RaffleController = require('../controllers/raffle.controllers');
const raffleValidation = require('../validation/raffle.validator.js');

const authMiddleware = require("../middleware/auth");

router.get(
  '/getRaffles/:page',
  [
    authMiddleware.authenticateToken,
    raffleValidation.getRaffleList
  ],
  authMiddleware.authenticateToken,
  RaffleController.getRaffleList
)

router.get(
  '/get/:id',
  [
    authMiddleware.authenticateToken,
    raffleValidation.getRaffleData
  ],
  RaffleController.getRaffleData
)

router.post(
  '/create',
  [
    authMiddleware.authenticateToken,
    raffleValidation.createRaffle
  ],
  RaffleController.createRaffle
)

router.put(
  '/update/:id',
  [
    authMiddleware.authenticateToken,
    raffleValidation.createRaffle
  ],
  RaffleController.updateRaffle
)

router.delete(
  '/delete/:id',
  [
    authMiddleware.authenticateToken,
    raffleValidation.getRaffleData
  ],
  RaffleController.deleteRaffle
)

module.exports = router;