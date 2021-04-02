const UserService = require('../services/userServices')

exports.getUsers = async function (req, res, next) {
  let page = req.params.page

  let
    limit = parseInt(req.query.limit) || 10,
    sort = req.query.sort,
    sort_dir = req.query.sort_dir,
    search = req.query.search

  try {
    let users = await UserService.getUsers(page, limit, sort, sort_dir, search)
    res.json({ data: users })
  } catch (err) {
    next(err)
  }
}

exports.getUserById = async function (req, res, next) {
  let id = req.params.id

  try {
    let user = await UserService.getUserById(id)
    res.json({ data: user })
  } catch (err) {
    next(err)
  }
}

exports.blockUser = async function (req, res, next) {
  let id = req.params.id
  let block = {
    "user_id": id,
    "reason": req.query.reason,
    "admin_blocking": req.user.id,
  }

  try {
    let user = await UserService.blockUser(id, block);
    res.json({ data: user })
  } catch (err) {
    next(err)
  }
}

exports.unblockUser = async function (req, res, next) {
  let id = req.params.id

  try {
    let user = await UserService.unblockUser(id);
    res.json({ data: user })
  } catch (err) {
    next(err)
  }
}

exports.acceptUser = async function (req, res, next) {
  let id = req.params.id

  try {
    let user = await UserService.acceptUser(id);
    res.json({ data: user })
  } catch (err) {
    next(err)
  }
}