const db = require('../models')
// const Announce = db.announce;
const Tags = db.tags

exports.checkTags = async function (tags) {
  try {
    const ctags = await Tags.findAll({
      where: {
        id: tags
      }
    })

    if (ctags.length > 0) {
      return true
    } else {
      const errorMessage = { status: 404, message: 'Tags not found in the database' }
      throw errorMessage
    }
  } catch (err) {
    const errorMessage = { status: err.status, message: err.message || 'Some error occurred while getting the Announce.' }
    throw errorMessage
  }
}
