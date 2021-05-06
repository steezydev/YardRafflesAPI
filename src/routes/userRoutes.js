const { Router } = require('express')
const router = Router()

const UserController = require('../controllers/userControllers')
const userValidation = require('../validation/userValidator.js')
const authMiddleware = require('../middleware/auth')

router.get(
  '/getUsers',
  [
    authMiddleware.authenticateToken,
    userValidation.getUserList
  ],
  UserController.getUsers
)

router.get(
  '/get/:id',
  [
    authMiddleware.authenticateToken,
    userValidation.checkId
  ],
  UserController.getUserById
)

router.put(
  '/block/:id',
  [
    authMiddleware.authenticateToken,
    userValidation.checkBlockUser
  ],
  UserController.blockUser
)

router.put(
  '/unblock/:id',
  [
    authMiddleware.authenticateToken,
    userValidation.checkId
  ],
  UserController.unblockUser
)

router.put(
  '/accept/:id',
  [
    authMiddleware.authenticateToken,
    userValidation.checkId
  ],
  UserController.acceptUser
)

module.exports = router
