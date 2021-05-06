const db = require('../models')
const Admin = db.admin

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.signup = async function (regUser) {
  try {
    const user = await Admin.create({
      username: regUser.username,
      email: regUser.email,
      password: bcrypt.hashSync(regUser.password, 8)
    })

    return user
  } catch (err) {
    const errorMessage = { status: 500, message: err.message || 'Some error occurred while getting Announces.' }
    throw errorMessage
  }
}

exports.signin = async function (loginUser) {
  try {
    const user = await Admin.findOne({
      where: {
        email: loginUser.email
      }
    })

    if (!user) {
      const errorMessage = { status: 401, message: 'Invalid password or email' }
      throw errorMessage
    }

    const passwordIsValid = bcrypt.compareSync(
      loginUser.password,
      user.password
    )

    if (!passwordIsValid) {
      const errorMessage = { status: 401, message: 'Invalid password or email' }
      throw errorMessage
    }

    const token = jwt.sign({ id: user.id }, process.env.AUTH_SECRET, {
      expiresIn: 86400 // 24 hours
    })

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token
    }
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message || 'Some error occurred' }
    throw errorMessage
  }
}

exports.getAdminUser = async function (userId) {
  try {
    const user = await Admin.findByPk(userId, {
      attributes: [
        'id',
        'username',
        'email',
        'createdAt',
        'updatedAt'
      ]
    })

    return user
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message || 'Some error occurred while getting the Announce.' }
    throw errorMessage
  }
}
