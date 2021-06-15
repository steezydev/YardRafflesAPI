const { Router } = require('express')
const router = Router()

const UserController = require('../controllers/userControllers')
const userValidation = require('../validation/userValidator.js')
const authMiddleware = require('../middleware/auth')

/**
 * @name getUsers
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/users/getAllUser
 */
router.get(
  '/getUsers',
  [
    authMiddleware.authenticateToken,
    userValidation.getUserList
  ],
  UserController.getUsers
)

/**
 * @name getUserById
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/users/getUserById
 */
router.get(
  '/get/:id',
  [
    authMiddleware.authenticateToken,
    userValidation.checkId
  ],
  UserController.getUserById
)

/**
 * @name blockUser
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/users/blockUser
 */
router.put(
  '/block/:id',
  [
    authMiddleware.authenticateToken,
    userValidation.checkBlockUser
  ],
  UserController.blockUser
)

/**
 * @name unblockUser
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/users/unblockUser
 */
router.put(
  '/unblock/:id',
  [
    authMiddleware.authenticateToken,
    userValidation.checkId
  ],
  UserController.unblockUser
)

/**
 * @name acceptUser
 * @link https://app.swaggerhub.com/apis/Nuko/YardRaffleBot/1.0.0#/users/acceptUser
 */
router.put(
  '/accept/:id',
  [
    authMiddleware.authenticateToken,
    userValidation.checkId
  ],
  UserController.acceptUser
)

module.exports = router
