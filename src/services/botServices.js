const db = require('../models')
const User = db.user

/** 
   * Get bot user by id
   * 
   * @param id {number} - User's id in database
   * @returns User object
   * 
*/
exports.getBotUserById = async function (id) {
  try {
    const user = await User.findByPk(id)

    if (user !== null) {
      return user
    } else {
      throw { status: 404, message: 'Not found in the database' }
    }
  } catch (err) {
    throw { status: err.status || 500, message: err.message || 'Some error occurred while getting Announces.' }
  }
}

/** 
   * Get bot user by telegramId
   * 
   * @param telegramId {number} - User's telegram id
   * @returns User object
   * 
*/
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
      throw { status: 404, message: 'Not found in the database' }
    }
  } catch (err) {
    throw { status: err.status || 500, message: err.message || 'Some error occurred while getting Announces.' }
  }
}

/** 
   * Create new User
   * 
   * @param newUser {object} - User's data
   * @returns User object
   * 
*/
exports.addUser = async function (newUser) {
  try {
    const createUser = await User.create(newUser)

    return await exports.getBotUser(createUser.telegramId)
  } catch (err) {
    throw { status: err.status || 500, message: err.message || 'Some error occurred while getting Announces.' }
  }
}

/** 
   * Updates User data
   * 
   * @param telegramId {number} - User's telegram id
   * @param updateUser {object} - User's data to update
   * @returns User object
   * 
*/
exports.updateUser = async function (telegramId, updateUser) {
  try {
    await User.update(updateUser, {
      where: {
        telegramId: telegramId
      }
    })

    return await exports.getBotUser(telegramId)
  } catch (err) {
    throw { status: err.status || 500, message: err.message || 'Some error occurred while getting Announces.' }
  }
}
