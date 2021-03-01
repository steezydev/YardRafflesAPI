const db = require("../models");
const Announce = db.announce;

exports.getAllAnnounces = async function () {
  try {
    let annouces = await Announce.findAll()

    return annouces;
  } catch (err) {
    throw ({ status: 500, message: err.message || "Some error occurred while getting Announces." });
  }
}

exports.getAnnounceById = async function (id) {
  try {
    let annouces = await Announce.findAll({
      where: {
        id: id
      }
    })

    return annouces;
  } catch (err) {
    throw ({ status: 500, message: err.message || "Some error occurred while getting the Announce." });
  }
}

exports.createAnnounce = async function (newAnnounce) {
  try {
    announce = await Announce.create(newAnnounce)

    return announce;
  } catch (err) {
    throw ({ status: 500, message: err.message || "Some error occurred while creating the Announce." });
  }
}

exports.updateAnnounce = async function (id, updateAnnounce) {
  try {
    announce = await Announce.update(updateAnnounce, {
      where: { id: id }
    })

    if (announce == 1) {
      return await exports.getAnnounceById(id)
    } else {
      throw ({ status: 404, message: 'Not found in the database' });
    }
  } catch (err) {
    throw ({ status: 500, message: err.message });
  }
}