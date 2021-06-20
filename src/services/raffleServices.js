const { Op } = require('sequelize')
const db = require('../models')
const Raffle = db.raffle
const Tags = db.tags
// const User = db.user
const Participation = db.participation
const _ = require('lodash')

// const ParticipationService = require('./participationServices')
const UserService = require('./userServices')

/** 
   * Get all raffles with filtering
   * 
   * @param page {number} - Page
   * @param limit {number} - Limit per page
   * @param sort {string} - Sort by column
   * @param sortDir {string} - Sorting direction (asc, desc)
   * @param search {string} - Search string
   * @returns Array of Raffle objects
   * 
*/
exports.getRaffleList = async function (page, limit, sort = 'id', sortDir = 'desc', search = '') {
  try {
    const checkRaffles = await Raffle.count()

    if (!checkRaffles) {
      return []
    }

    const options = {
      where: {
        [Op.or]: [
          { itemTitle: { [Op.like]: '%' + search + '%' } },
          { work_name: { [Op.like]: '%' + search + '%' } },
          { message: { [Op.like]: '%' + search + '%' } },
          { profit: { [Op.like]: '%' + search + '%' } }
        ]
      },
      subQuery: false,
      attributes: [
        'id',
        'itemTitle',
        'work_name',
        'images',
        'message',
        'link',
        'sizes',
        'publication_date',
        'publish',
        'close_date',
        'results_date',
        'status',
        'profit',
        [db.sequelize.fn('COUNT', db.sequelize.col('participation.id')), 'reg_count'],
        [db.sequelize.fn('COUNT', db.sequelize.col('participation2.id')), 'win_count']
      ],
      group: ['id'],
      include: [
        {
          model: Tags,
          as: 'tags',
          through: { attributes: [] },
          attributes: [
            'id',
            'itemTitle'
          ],
          required: false
        },
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

    const raffles = await Raffle.findAndCountAll(options)

    raffles.count = _.get(raffles, 'count.length')

    return raffles
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message || 'Some error occurred while getting Raffles.' }
    throw errorMessage
  }
}

/** 
   * Get raffle data
   * 
   * @param id {number} - Announce id in database
   * @returns Raffle object
   * 
*/
exports.getRaffleData = async function (id) {
  try {
    let raffle = await exports.getRaffleById(id)

    raffle = raffle.toJSON()

    raffle.reg_users = await UserService.getRegedUsers(id)
    raffle.win_users = await UserService.getWinUsers(id)

    return raffle
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message || 'Some error occurred while getting the Raffle.' }
    throw errorMessage
  }
}

/** 
   * Get raffle by id
   * 
   * @param id {number} - Announce id in database
   * @returns Raffle object
   * 
*/
exports.getRaffleById = async function (raffleId, telegramId) {
  try {
    const { id: userId } = await UserService.getUserByTelegramId(telegramId)

    const raffle = await Raffle.findByPk(raffleId, {
      attributes: [
        'id',
        'itemTitle',
        'work_name',
        'images',
        'message',
        'link',
        'sizes',
        'publication_date',
        'publish',
        'close_date',
        'results_date',
        'status',
        'profit',
        [db.sequelize.col('participation.successHash'), 'successHash'],
        [db.sequelize.literal('CASE WHEN participation.status IS NULL THEN 0 ELSE participation.status END'), 'userStatus'],
      ],
      include: [
        {
          model: Tags,
          as: 'tags',
          through: { attributes: [] }
        },
        {
          model: Participation,
          as: 'participation',
          where: {
            user_id: userId
          },
          attributes: [],
          required: false
        }
      ]
    })

    if (!raffle) {
      const errorMessage = { status: 404, message: 'Raffle not found' }
      throw errorMessage
    }

    return raffle
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message || 'Some error occurred while getting the Raffle.' }
    throw errorMessage
  }
}

/** 
   * Delete raffle
   * 
   * @param id {number} - Announce id in database
   * @returns status
   * 
*/
exports.deleteRaffle = async function (id) {
  try {
    const raffle = await Raffle.destroy({
      where: {
        id: id
      }
    })

    if (raffle === 1) {
      return true
    } else {
      const errorMessage = { status: 404, message: 'Not found in the database' }
      throw errorMessage
    }
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message || 'Some error occurred while getting the Raffle.' }
    throw errorMessage
  }
}


/** 
   * Create Raffle
   * 
   * @param newRaffle {object} - Raffle data
   * @param tags {object} - tags
   * @returns Raffle object
   * 
*/
exports.createRaffle = async function (newRaffle, tags) {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const createRaffle = await Raffle.create(newRaffle, {
        include: [Tags],
        transaction: t
      })

      await createRaffle.addTag(tags, { transaction: t })

      return createRaffle
    })

    return await exports.getRaffleById(result.id)
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message || 'Some error occurred while creating the Raffle.' }
    throw errorMessage
  }
}

/** 
   * Update Raffle
   * 
   * @param id {number} - Raffle id
   * @param updateRaffle {object} - Raffle data
   * @param tags {object} - tags
   * @returns Raffle object
   * 
*/
exports.updateRaffle = async function (id, updateRaffle, tags) {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const oldRaffle = await exports.getRaffleById(id)

      const raffle = await Raffle.update(updateRaffle, {
        where: {
          id: id
        },
        include: [Tags],
        transaction: t
      })

      console.log(tags)
      if (tags !== undefined) {
        await oldRaffle.setTags(tags, { transaction: t })
      }

      return raffle
    })

    if (result[0] === 1) {
      return await exports.getRaffleById(id)
    } else {
      const errorMessage = { status: 404, message: 'Not found in the database' }
      throw errorMessage
    }
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message }
    throw errorMessage
  }
}

/** 
   * Get Raffle to post in bot
   * 
   * @returns Array of raffle objects
   * 
*/
exports.getRafflesToPost = async function () {
  try {
    const checkRaffles = await Raffle.count()

    if (!checkRaffles) {
      return []
    }

    const raffles = await db.sequelize.transaction(async (t) => {
      const raffles = await Raffle.findAll({
        where: {
          publish: 1,
          status: 0,
          publication_date: {
            [Op.lt]: new Date(Date.now())
          }
        },
        transaction: t
      })

      await Raffle.update({ status: 1 }, {
        where: {
          publish: 1,
          status: 0,
          publication_date: {
            [Op.lt]: new Date(Date.now())
          }
        },
        transaction: t
      })

      return raffles
    })

    return raffles
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message || 'Some error occurred while getting Raffles.' }
    throw errorMessage
  }
}

/** 
   * Get current Raffles user participated
   * 
   * @returns Array of raffle objects
   * 
*/
exports.getCurrPartRaffles = async function (telegramId) {
  try {
    const { id: userId } = await UserService.getUserByTelegramId(telegramId)

    const checkRaffles = await Raffle.count()

    if (!checkRaffles) {
      return []
    }

    const raffles = await Raffle.findAll({
      attributes: [
        'id',
        'itemTitle',
        'work_name',
        'images',
        'message',
        'link',
        'sizes',
        'publication_date',
        'publish',
        'close_date',
        'results_date',
        'status',
        'profit',
        [db.sequelize.literal('CASE WHEN participation.status IS NULL THEN 0 ELSE participation.status END'), 'userStatus'],
      ],
      where: {
        status: 1,
        close_date: {
          [Op.gt]: new Date(Date.now())
        }
      },
      include: [
        {
          model: Participation,
          as: 'participation',
          where: {
            user_id: userId
          },
          attributes: []
        },
      ]
    })

    return raffles
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message || 'Some error occurred while getting Raffles.' }
    throw errorMessage
  }
}

/** 
   * Get Raffles user participated
   * 
   * @returns Array of raffle objects
   * 
*/
exports.getParticipatedRaffles = async function (telegramId) {
  try {
    const { id: userId } = await UserService.getUserByTelegramId(telegramId)

    const checkRaffles = await Raffle.count()

    if (!checkRaffles) {
      return []
    }

    const raffles = await Raffle.findAll({
      attributes: [
        'id',
        'itemTitle',
        'work_name',
        'images',
        'message',
        'link',
        'sizes',
        'publication_date',
        'publish',
        'close_date',
        'results_date',
        'status',
        'profit',
        [db.sequelize.literal('CASE WHEN participation.status IS NULL THEN 0 ELSE participation.status END'), 'userStatus'],
      ],
      include: [
        {
          model: Participation,
          as: 'participation',
          where: {
            user_id: userId
          },
          attributes: []
        },
      ]
    })

    return raffles
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message || 'Some error occurred while getting Raffles.' }
    throw errorMessage
  }
}

/** 
   * Get Raffles user won
   * 
   * @returns Array of raffle objects
   * 
*/
exports.getWonRaffles = async function (telegramId) {
  try {
    const { id: userId } = await UserService.getUserByTelegramId(telegramId)

    const checkRaffles = await Raffle.count()

    if (!checkRaffles) {
      return []
    }

    const raffles = await Raffle.findAll({
      attributes: [
        'id',
        'itemTitle',
        'work_name',
        'images',
        'message',
        'link',
        'sizes',
        'publication_date',
        'publish',
        'close_date',
        'results_date',
        'status',
        'profit',
        [db.sequelize.col('participation.closed'), 'closed'],
        [db.sequelize.literal('CASE WHEN participation.status IS NULL THEN 0 ELSE participation.status END'), 'userStatus'],
      ],
      order: [
        [db.sequelize.col('participation.closed'), 'ASC'],
      ],
      include: [
        {
          model: Participation,
          as: 'participation',
          where: {
            user_id: userId,
            status: 2
          },
          attributes: []
        },
      ]
    })

    return raffles
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message || 'Some error occurred while getting Raffles.' }
    throw errorMessage
  }
}

/** 
   * Get current Raffles
   * 
   * @returns Array of raffle objects
   * 
*/
exports.getCurrentRaffles = async function (telegramId) {
  try {
    const { id: userId } = await UserService.getUserByTelegramId(telegramId)

    const checkRaffles = await Raffle.count()

    if (!checkRaffles) {
      return []
    }

    const raffles = await Raffle.findAll({
      attributes: [
        'id',
        'itemTitle',
        'work_name',
        'images',
        'message',
        'link',
        'sizes',
        'publication_date',
        'publish',
        'close_date',
        'results_date',
        'status',
        'profit',
        [db.sequelize.literal('CASE WHEN participation.status IS NULL THEN 0 ELSE participation.status END'), 'userStatus'],
      ],
      where: {
        status: 1,
        close_date: {
          [Op.gt]: new Date(Date.now())
        }
      },
      include: [
        {
          model: Participation,
          as: 'participation',
          where: {
            user_id: userId
          },
          attributes: [],
          required: false
        },
      ]
    })

    return raffles
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message || 'Some error occurred while getting Raffles.' }
    throw errorMessage
  }
}

/** 
   * Get Raffles stats
   * 
   * @returns Object of stats
   * 
*/
exports.getRafflesStats = async function () {
  try {
    const active = await Raffle.count({
      where: {
        status: 1,
        close_date: {
          [Op.gt]: new Date(Date.now())
        }
      }
    })

    const history = await Raffle.count()

    const stats = {
      active: active,
      history: history
    }

    return stats
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message || 'Some error occurred while getting Raffles.' }
    throw errorMessage
  }
}

/** 
   * Get Raffles stats for user
   * 
   * @param telegramId - User's telegram id
   * @returns Object of stats
   * 
*/
exports.getUserRafflesStats = async function (telegramId) {
  try {
    const { id: userId } = await UserService.getUserByTelegramId(telegramId)

    const current = await Raffle.count({
      where: {
        status: 1,
        close_date: {
          [Op.gt]: new Date(Date.now())
        }
      },
      include: [
        {
          model: Participation,
          as: 'participation',
          where: {
            [Op.or]: [
              { status: 0 },
              { status: 1 },
              { status: 2 }
            ],
            user_id: userId
          },
          attributes: []
        }
      ]
    })

    const participated = await Raffle.count({
      include: [
        {
          model: Participation,
          as: 'participation',
          where: {
            user_id: userId,
            [Op.or]: [
              { status: 0 },
              { status: 1 },
              { status: 2 }
            ]
          },
          attributes: []
        }
      ]
    })

    const won = await Raffle.count({
      include: [
        {
          model: Participation,
          as: 'participation',
          where: {
            user_id: userId,
            [Op.or]: [
              { status: 2 }
            ]
          },
          attributes: []
        }
      ]
    })

    const stats = {
      current: current,
      participated: participated,
      won: won
    }

    return stats
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message || 'Some error occurred while getting Raffles.' }
    throw errorMessage
  }
}
