const {Router} = require('express')
const router = Router();

const UserController = require('../controllers/user.controllers');
const userValidation = require('../validation/user.validator.js');
const authMiddleware = require("../middleware/auth");

router.get(
  '/getUsers', 
  [
    authMiddleware.authenticateToken,
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

module.exports = router;