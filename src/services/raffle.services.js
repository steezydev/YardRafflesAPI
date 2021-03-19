const { Op } = require("sequelize");
const db = require("../models");
const Raffle = db.raffle;
const Tags = db.tags;
const User = db.user;
const Participation = db.participation;
const _ = require('lodash');

const ParticipationService = require('../services/participation.services')
const UserService = require('../services/user.services')

exports.getRaffleList = async function (page) {
  try {
    let checkRaffles = await Raffle.count()

    if (!checkRaffles) {
      return []
    }

    let raffles = await Raffle.findAndCountAll({
      subQuery: false,
      limit: 10,
      offset: 10 * (page - 1),
      attributes: [
        'id',
        'title',
        'work_name',
        'images',
        'message',
        'link',
        'sizes',
        'publication_date',
        'close_date',
        'results_date',
        'status',
        'profit',
        [db.sequelize.fn('COUNT', db.sequelize.col('participation.id')), 'reg_count'],
        [db.sequelize.fn('COUNT', db.sequelize.col('participation2.id')), 'win_count'],
      ],
      group: ['id'],
      include: [
        {
          model: Tags,
          as: "tags",
          through: { attributes: [] },
          attributes: [
            'id',
            'title',
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
            status: 2,
          },
          attributes: [],
          required: false
        }
      ],
    })

    raffles.count=_.get(raffles,'count.length');

    return raffles;
  } catch (err) {
    throw ({ status: err.status || 500, message: err.message || "Some error occurred while getting Raffles." });
  }
}

exports.getRaffleById = async function (id) {
  try {
    let raffle = await Raffle.findByPk(id, {
      include: [
        {
          model: Tags,
          as: "tags",
          through: { attributes: [] }
        }
      ],
    })

    if (!raffle) {
      throw ({ status: 404, message: 'Raffle not found' })
    }

    raffle = raffle.toJSON()

    raffle.reg_users = await UserService.getRegedUsers(id)
    raffle.win_users = await UserService.getWinUsers(id)

    return raffle;
  } catch (err) {
    throw ({ status: err.status || 500, message: err.message || "Some error occurred while getting the Raffle." });
  }
}

exports.deleteRaffle = async function (id) {
  try {
    let raffle = await Raffle.destroy({
      where: {
        id: id
      }
    })

    if (raffle == 1) {
      return true
    } else {
      throw ({ status: 404, message: 'Not found in the database' });
    }
  } catch (err) {
    throw ({ status: err.status || 500, message: err.message || "Some error occurred while getting the Raffle." });
  }
}

exports.createRaffle = async function (newRaffle, tags) {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const creatRaffle = await Raffle.create(newRaffle, {
        include: [Tags],
        transaction: t
      })

      await creatRaffle.addTag(tags, { transaction: t })

      return creatRaffle;
    });

    return await exports.getRaffleById(result.id);
  } catch (err) {
    throw ({ status: err.status || 500, message: err.message || "Some error occurred while creating the Raffle." });
  }
}

exports.updateRaffle = async function (id, updateRaffle, tags) {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const oldRaffle = await exports.getRaffleById(id);

      const raffle = await Raffle.update(updateRaffle, {
        where: {
          id: id
        },
        include: [Tags],
        transaction: t
      })

      await oldRaffle.setTags(tags, { transaction: t })

      return raffle;
    });

    if (result == 1) {
      return await exports.getRaffleById(id)
    } else {
      throw ({ status: 404, message: 'Not found in the database' });
    }
  } catch (err) {
    throw ({ status: err.status || 500, message: err.message });
  }
}