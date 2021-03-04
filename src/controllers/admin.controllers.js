const AdminService = require('../services/admin.services')

exports.signup = async (req, res, next) => {
  let regUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }

  try {
    let user = await AdminService.signup(regUser)
    res.json({ data: user })
  } catch (err) {
    next(err)
  }
};

exports.signin = async (req, res, next) => {
  let loginUser = {
    email: req.body.email,
    password: req.body.password
  }

  try {
    let user = await AdminService.signin(loginUser)
    res.json({ data: user })
  } catch (err) {
    next(err)
  }
};