const { Op } = require('sequelize')
const db = require('../models')
const Participation = db.participation
const Blocked = db.blocked
const User = db.user
const _ = require('lodash')

exports.getUsers = async function (page, limit, sort = 'id', sortDir = 'desc', search = '') {
  try {
    const checkUsers = await User.count()

    if (!checkUsers) {
      return []
    }

    const options = {
      where: {
        [Op.or]: [
          { username: { [Op.like]: '%' + search + '%' } },
          { telegramLink: { [Op.like]: '%' + search + '%' } },
          { phone: { [Op.like]: '%' + search + '%' } },
          { email: { [Op.like]: '%' + search + '%' } }
        ]
      },
      subQuery: false,
      attributes: [
        'id',
        'username',
        'balance',
        'telegramLink',
        'telegramId',
        'invitedId',
        'phone',
        'email',
        'userRank',
        'dateRegister',
        'accepted',
        'blocked',
        [db.sequelize.fn('COUNT', db.sequelize.col('participation.id')), 'reg_count'],
        [db.sequelize.fn('COUNT', db.sequelize.col('participation2.id')), 'win_count']
      ],
      include: [
        {
          model: Participation,
          as: 'participation',
          where: {
            [Op.or]: [
              { status: 0 },
              { status: 1 }
            ]
          },
          attributes: [],
          required: false
        },
        {
          model: Participation,
          as: 'participation2',
          where: {
            status: 2
          },
          attributes: [],
          required: false
        }
      ],
      group: ['id'],
      order: [
        [sort, sortDir]
      ]
    }

    if (limit !== undefined) {
      options.limit = limit
    }

    if (limit !== undefined && page !== undefined) {
      options.offset = limit * (page - 1)
    }

    const users = await User.findAndCountAll(options)

    users.count = _.get(users, 'count.length')

    return users
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message || 'Some error occurred.' }
    throw errorMessage
  }
}

exports.getUserById = async function (id) {
  try {
    const user = await User.findByPk(id, {
      include: [
        {
          model: Blocked,
          as: 'blocks',
          attributes: ['admin_blocking', 'reason', 'unblocked', 'createdAt', 'updatedAt']
        }
      ]
    })

    if (!user) {
      const errorMessage = { status: 404, message: 'User not found' }
      throw errorMessage
    }

    return user
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message || 'Some error occurred.' }
    throw errorMessage
  }
}

exports.blockUser = async function (id, block) {
  try {
    const user = await exports.getUserById(id)

    if (!user) {
      const errorMessage = { status: 404, message: 'User not found' }
      throw errorMessage
    }

    const isBlocked = await Blocked.count({
      where: {
        user_id: id,
        unblocked: 0
      }
    })

    if (isBlocked) {
      const errorMessage = { status: 400, message: 'User is already blocked' }
      throw errorMessage
    }

    const result = await db.sequelize.transaction(async (t) => {
      await Blocked.create(block, {
        transaction: t
      })

      const res = await User.update({ blocked: 1 }, {
        where: {
          id: id
        },
        transaction: t
      })

      if (res === 1) {
        return 1
      }
    })

    return result
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message || 'Some error occurred.' }
    throw errorMessage
  }
}

exports.unblockUser = async function (id) {
  try {
    const isBlocked = await Blocked.count({
      where: {
        user_id: id,
        unblocked: 0
      }
    })

    console.log(isBlocked)

    if (!isBlocked) {
      const errorMessage = { status: 400, message: 'User is not blocked' }
      throw errorMessage
    }

    const result = await db.sequelize.transaction(async (t) => {
      const res = await Blocked.update({ unblocked: 1 }, {
        where: {
          user_id: id,
          unblocked: 0
        },
        transaction: t,
        limit: 1
      })

      await User.update({ blocked: 0 }, {
        where: {
          id: id
        },
        transaction: t
      })

      return res
    })

    if (result[0] === 1) {
      return 1
    } else {
      const errorMessage = { status: 500, message: 'Error occured' }
      throw errorMessage
    }
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message || 'Some error occurred.' }
    throw errorMessage
  }
}

exports.acceptUser = async function (id) {
  try {
    const isAccepted = await User.count({
      where: {
        id: id,
        accepted: 0
      }
    })

    if (!isAccepted) {
      const errorMessage = { status: 400, message: 'User is already accepted' }
      throw errorMessage
    }

    const accept = {
      accepted: 1
    }

    const res = await User.update(accept, {
      where: {
        id: id
      }
    })

    if (res[0] === 1) {
      return 1
    } else {
      const errorMessage = { status: 500, message: 'Error occured' }
      throw errorMessage
    }
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message || 'Some error occurred.' }
    throw errorMessage
  }
}

exports.getRegedUsers = async function (raffleId) {
  try {
    const users = await User.findAll({
      attributes: [
        '*',
        'participation.status',
        'participation.reg_date',
        'participation.successHash'
      ],
      include: [
        {
          model: Participation,
          as: 'participation',
          where: {
            raffle_id: raffleId,
            [Op.or]: [
              { status: 0 },
              { status: 1 }
            ]
          },
          attributes: []
        }
      ],
      raw: true
    })

    return users
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message || 'Some error occurred.' }
    throw errorMessage
  }
}

exports.getWinUsers = async function (raffleId) {
  try {
    const users = await User.findAll({
      attributes: [
        '*',
        'participation.status',
        'participation.reg_date',
        'participation.successHash'
      ],
      include: [
        {
          model: Participation,
          as: 'participation',
          where: {
            raffle_id: raffleId,
            status: 2
          },
          attributes: []
        }
      ],
      raw: true
    })

    return users
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message || 'Some error occurred.' }
    throw errorMessage
  }
}
