const { Router } = require('express')
const router = Router();

const adminValidation = require('../validation/admin.validator.js');
const AdminController = require('../controllers/admin.controllers');


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