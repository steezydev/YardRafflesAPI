const db = require("../models");
const Announce = db.announce;
const Tags = db.tags;

exports.getAllAnnounces = async function () {
  try {
    let annouces = await Announce.findAll({
      include: [
        {
          model: Tags,
          as: "tags",
          through: { attributes: [] }
        },
      ],
    })

    return annouces;
  } catch (err) {
    throw ({ status: 500, message: err.message || "Some error occurred while getting Announces." });
  }
}

exports.getAnnounceById = async function (id) {
  try {
    let annouces = await Announce.findByPk(id, {
      include: [
        {
          model: Tags,
          as: "tags",
          through: { attributes: [] }
        },
      ],
    })

    return annouces;
  } catch (err) {
    throw ({ status: 500, message: err.message || "Some error occurred while getting the Announce." });
  }
}

exports.deleteAnnounce = async function (id) {
  try {
    let announce = await Announce.destroy({
      where: {
        id: id
      }
    })

    if (announce == 1) {
      return true
    } else {
      throw ({ status: 404, message: 'Not found in the database' });
    }
  } catch (err) {
    throw ({ status: 500, message: err.message || "Some error occurred while getting the Announce." });
  }
}

exports.createAnnounce = async function (newAnnounce, tags) {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const creatAnnounce = await Announce.create(newAnnounce, {
        include: [Tags],
        transaction: t
      })

      await creatAnnounce.addTag(tags, { transaction: t })

      return creatAnnounce;
    });

    return await exports.getAnnounceById(result.id);
  } catch (err) {
    throw ({ status: 500, message: err.message || "Some error occurred while creating the Announce." });
  }
}

exports.updateAnnounce = async function (id, updateAnnounce, tags) {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const oldAnnouce = await exports.getAnnounceById(id);

      const announce = await Announce.update(updateAnnounce, {
        where: {
          id: id
        },
        include: [Tags],
        transaction: t
      })

      await oldAnnouce.setTags(tags, { transaction: t })

      return announce;
    });

    if (result == 1) {
      return await exports.getAnnounceById(id)
    } else {
      throw ({ status: 404, message: 'Not found in the database' });
    }
  } catch (err) {
    throw ({ status: 500, message: err.message });
  }
}

exports.addAnnounce = (tagId, annouceId) => {
  return Tags.findByPk(tagId)
    .then((tag) => {
      if (!tag) {
        console.log("Tag not found!");
        return null;
      }
      return Announce.findByPk(annouceId).then((annouce) => {
        if (!annouce) {
          console.log("Tutorial not found!");
          return null;
        }

        tag.addAnnounce(annouce);
        console.log(`>> added Tutorial id=${tutorial.id} to Tag id=${tag.id}`);
        return tag;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Tutorial to Tag: ", err);
    });
};