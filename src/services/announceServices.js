const { Op } = require('sequelize')
const db = require('../models')
const Announce = db.announce
const Tags = db.tags
const _ = require('lodash')

/** 
   * Get all announcements with filtering
   * 
   * @param page {number} - Page
   * @param limit {number} - Limit per page
   * @param sort {string} - Sort by column
   * @param sortDir {string} - Sorting direction (asc, desc)
   * @param search {string} - Search string
   * @returns Array of Announce objects
   * 
*/
exports.getAllAnnounces = async function (page, limit, sort = 'id', sortDir = 'desc', search = '') {
  try {
    const options = {
      where: {
        [Op.or]: [
          { itemTitle: { [Op.like]: '%' + search + '%' } },
          { work_name: { [Op.like]: '%' + search + '%' } },
          { message: { [Op.like]: '%' + search + '%' } }
        ]
      },
      subQuery: false,
      include: [
        {
          model: Tags,
          as: 'tags',
          through: { attributes: [] },
          require: false
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

    const annouces = await Announce.findAndCountAll(options)

    annouces.count = _.get(annouces, 'count.length')

    return annouces
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message || 'Some error occurred while getting Announces.' }
    throw errorMessage
  }
}

/** 
   * Get announce user by id
   * 
   * @param id {number} - Announce id in database
   * @returns Announce object
   * 
*/
exports.getAnnounceById = async function (id) {
  try {
    const annouces = await Announce.findByPk(id, {
      include: [
        {
          model: Tags,
          as: 'tags',
          through: { attributes: [] }
        }
      ]
    })

    if (!annouces) {
      const errorMessage = { status: 404, message: 'Announce not found' }
      throw errorMessage
    }

    return annouces
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message || 'Some error occurred while getting the Announce.' }
    throw errorMessage
  }
}

/** 
   * Delete Announce
   * 
   * @param id {number} - Announce id in database
   * @returns Status
   * 
*/
exports.deleteAnnounce = async function (id) {
  try {
    const announce = await Announce.destroy({
      where: {
        id: id
      }
    })

    if (announce === 1) {
      return true
    } else {
      const errorMessage = { status: 404, message: 'Not found in the database' }
      throw errorMessage
    }
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message || 'Some error occurred while getting the Announce.' }
    throw errorMessage
  }
}

/** 
   * Create Announce
   * 
   * @param newAnnounce {object} - Announce data
   * @param tags {object} - tags
   * @returns Announce object
   * 
*/
exports.createAnnounce = async function (newAnnounce, tags) {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const creatAnnounce = await Announce.create(newAnnounce, {
        include: [Tags],
        transaction: t
      })

      await creatAnnounce.addTag(tags, { transaction: t })

      return creatAnnounce
    })

    return await exports.getAnnounceById(result.id)
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message || 'Some error occurred while creating the Announce.' }
    throw errorMessage
  }
}

/** 
   * Update Announce
   * 
   * @param id {number} - Announce id
   * @param newAnnounce {object} - Announce data
   * @param tags {object} - tags
   * @returns Announce object
   * 
*/
exports.updateAnnounce = async function (id, updateAnnounce, tags) {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const oldAnnouce = await exports.getAnnounceById(id)

      const announce = await Announce.update(updateAnnounce, {
        where: {
          id: id
        },
        include: [Tags],
        transaction: t
      })

      console.log(tags)

      if (tags !== undefined) {
        await oldAnnouce.setTags([tags], { transaction: t })
      }

      return announce
    })

    if (result[0] === 1) {
      return await exports.getAnnounceById(id)
    } else {
      const errorMessage = { status: 404, message: 'Not found in the database' }
      throw errorMessage
    }
  } catch (err) {
    const errorMessage = { status: err.status || 500, message: err.message }
    throw errorMessage
  }
}
