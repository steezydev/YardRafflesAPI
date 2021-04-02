const { Op } = require("sequelize");
const db = require("../models");
const Participation = db.participation;
const Blocked = db.blocked;
const User = db.user;
const _ = require('lodash');

exports.getUsers = async function (page = 1, limit = 10, sort = 'id', sort_dir = 'desc', search = '') {
  try {
    let checkUsers = await User.count()

    if (!checkUsers) {
      return []
    }

    let users = await User.findAndCountAll({
      where: {
        [Op.or]: [
          {username: { [Op.like]: '%' + search + '%' }},
          {telegram_link: { [Op.like]: '%' + search + '%' }},
          {phone: { [Op.like]: '%' + search + '%' }},
          {email: { [Op.like]: '%' + search + '%' }},
        ]
      },
      subQuery: false,
      limit: limit,
      offset: limit * (page - 1),
      attributes: [
        'id',
        'username',
        'balance',
        'telegram_link',
        'telegram_id',
        'invited_id',
        'phone',
        'email',
        'user_rank',
        'date_register',
        'accepted',
        'blocked',
        [db.sequelize.fn('COUNT', db.sequelize.col('participation.id')), 'reg_count'],
        [db.sequelize.fn('COUNT', db.sequelize.col('participation2.id')), 'win_count'],
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
            status: 2,
          },
          attributes: [],
          required: false
        }
      ],
      group: ['id'],
      order: [
        [sort, sort_dir],
      ]
    })

    users.count=_.get(users,'count.length');

    return users;
  } catch (err) {
    throw ({ status: err.status || 500, message: err.message || "Some error occurred." });
  }
}

exports.getUserById = async function (id) {
  try {
    let user = await User.findByPk(id, {
      include: [
        {
          model: Blocked,
          as: "blocks",
          attributes: ['admin_blocking', 'reason', 'unblocked', 'createdAt', 'updatedAt']
        },
      ]
    })

    return user;
  } catch (err) {
    throw ({ status: err.status || 500, message: err.message || "Some error occurred." });
  }
}

exports.blockUser = async function (id, block) {
  try {
    let user = await exports.getUserById(id)

    if (!user) {
      throw ({ status: 404, message: "User not found" });
    }

    let isBlocked = await Blocked.count({
      where: {
        user_id: id,
        unblocked: 0,
      }
    })

    if (isBlocked) {
      throw ({ status: 400, message: "User is already blocked" });
    }

    const result = await db.sequelize.transaction(async (t) => {

     await Blocked.create(block, {
        transaction: t
      })

      const res = await User.update({ "blocked": 1 }, {
        where: {
          id: id
        },
        transaction: t
      })

      return 1;
    });


    return result;
  } catch (err) {
    throw ({ status: err.status || 500, message: err.message || "Some error occurred." });
  }
}

exports.unblockUser = async function (id) {
  try {
    let isBlocked = await Blocked.count({
      where: {
        user_id: id,
        unblocked: 0,
      }
    })

    if (!isBlocked) {
      throw ({ status: 400, message: "User is not blocked" });
    }

    const result = await db.sequelize.transaction(async (t) => {
      const res = await Blocked.update({ "unblocked": 1 }, {
        where: {
          user_id: id
        },
        transaction: t,
        limit: 1
      })

      await User.update({ "blocked": 0 }, {
        where: {
          id: id
        },
        transaction: t
      })

      return res;
    });

    if (result == 1) {
      return 1
    } else {
      throw ({ status: 500, message: 'Error occured' });
    }
  } catch (err) {
    throw ({ status: err.status || 500, message: err.message || "Some error occurred." });
  }
}

exports.acceptUser = async function (id) {
  try {
    let user = await User.findByPk(id)

    accept = {
      "accepted": 1
    }

    const res = await User.update(accept, {
      where: {
        id: id
      },
    })

    return 1;
  } catch (err) {
    throw ({ status: err.status || 500, message: err.message || "Some error occurred." });
  }
}

exports.getRegedUsers = async function (raffleId) {
  try {
    let users = await User.findAll({
      attributes: [
        '*',
        'participation.status',
        'participation.reg_date',
        'participation.successHash',
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

    return users;
  } catch (err) {
    throw ({ status: err.status || 500, message: err.message || "Some error occurred." });
  }
}

exports.getWinUsers = async function (raffleId) {
  try {
    let users = await User.findAll({
      attributes: [
        '*',
        'participation.status',
        'participation.reg_date',
        'participation.successHash',
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

    return users;
  } catch (err) {
    throw ({ status: err.status || 500, message: err.message || "Some error occurred." });
  }
}
