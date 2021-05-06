const UserService = require('../services/userServices')

exports.getUsers = async function (req, res, next) {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit) || 10
  const sort = req.query.sort
  const sortDir = req.query.sort_dir
  const search = req.query.search

  try {
    const users = await UserService.getUsers(page, limit, sort, sortDir, search)
    res.json({ data: users })
  } catch (err) {
    next(err)
  }
}

exports.getUserById = async function (req, res, next) {
  const id = req.params.id

  try {
    const user = await UserService.getUserById(id)
    res.json({ data: user })
  } catch (err) {
    next(err)
  }
}

exports.blockUser = async function (req, res, next) {
  const id = req.params.id
  const block = {
    user_id: id,
    reason: req.query.reason,
    admin_blocking: req.user.id
  }

  try {
    await UserService.blockUser(id, block)
    res.json({ data: 1 })
  } catch (err) {
    next(err)
  }
}

exports.unblockUser = async function (req, res, next) {
  const id = req.params.id

  try {
    await UserService.unblockUser(id)
    res.json({ data: 1 })
  } catch (err) {
    next(err)
  }
}

exports.acceptUser = async function (req, res, next) {
  const id = req.params.id

  try {
    const user = await UserService.acceptUser(id)
    res.json({ data: user })
  } catch (err) {
    next(err)
  }
}
