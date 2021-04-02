const { Router } = require('express')
const router = Router();

const adminValidation = require('../validation/adminValidator.js');
const AdminController = require('../controllers/adminControllers');


const authMiddleware = require("../middleware/auth");

router.post(
  "/signup",
  adminValidation.singUp,
  AdminController.signup
);

router.post(
  "/signin", 
  adminValidation.singIn,
  AdminController.signin
);

router.get(
  "/getAdminUser",
  authMiddleware.authenticateToken, 
  AdminController.getAdminUser
);

module.exports = router;