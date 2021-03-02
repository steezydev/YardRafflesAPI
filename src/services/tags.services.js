const db = require("../models");
const Announce = db.announce;
const Tags = db.tags;

exports.checkTags = async function (tags) {
  try {
    let ctags = await Tags.findAll({
      where: {
        id: tags
      }
    })

    if (ctags.length > 0) {
      return true
    } else {
      throw ({ status: 404, message: 'Not found in the database' });
    }
  } catch (err) {
    throw ({ status: err.status, message: err.message || "Some error occurred while getting the Announce." });
  }
}