const AdminService = require('../services/adminServices')

exports.signup = async (req, res, next) => {
  const regUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }

  try {
    const user = await AdminService.signup(regUser)
    res.json({ data: user })
  } catch (err) {
    next(err)
  }
}

exports.signin = async (req, res, next) => {
  const loginUser = {
    email: req.body.email,
    password: req.body.password
  }

  try {
    const user = await AdminService.signin(loginUser)
    res.json({ data: user })
  } catch (err) {
    next(err)
  }
}

exports.getAdminUser = async (req, res, next) => {
  const userId = req.user.id

  try {
    const user = await AdminService.getAdminUser(userId)
    res.json({ data: user })
  } catch (err) {
    next(err)
  }
}
