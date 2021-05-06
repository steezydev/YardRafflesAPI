const db = require('../models')
const User = db.user

exports.getBotUserById = async function (id) {
  try {
    const user = await User.findByPk(id)

    if (user !== null) {
      return user
    } else {
      const errorMessage = { status: 404, message: 'Not found in the database' }
      throw errorMessage
    }
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message || 'Some error occurred while getting Announces.' }
    throw errorMessage
  }
}

exports.getBotUser = async function (telegramId) {
  try {
    const user = await User.findOne({
      where: {
        telegramId: telegramId
      }
    })

    if (user !== null) {
      return user
    } else {
      const errorMessage = { status: 404, message: 'Not found in the database' }
      throw errorMessage
    }
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message || 'Some error occurred while getting Announces.' }
    throw errorMessage
  }
}

exports.addUser = async function (newUser) {
  try {
    const createUser = await User.create(newUser)

    return await exports.getBotUser(createUser.telegramId)
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message || 'Some error occurred while getting Announces.' }
    throw errorMessage
  }
}

exports.updateUser = async function (telegramId, updateUser) {
  try {
    await User.update(updateUser, {
      where: {
        telegramId: telegramId
      }
    })

    return await exports.getBotUser(telegramId)
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message || 'Some error occurred while getting Announces.' }
    throw errorMessage
  }
}
