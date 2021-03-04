const { Router } = require('express')
const router = Router();

const adminValidation = require('../validation/admin.validator.js');
const AdminController = require('../controllers/admin.controllers');

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

module.exports = router;