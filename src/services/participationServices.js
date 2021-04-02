const { Op } = require("sequelize");
const db = require("../models");
const Raffle = db.raffle;
const Participation = db.participation;
const User = db.user;

exports.getCountReg = async function (raffleId) {
  try {
    let count = await Participation.count({
      where: {
        raffle_id: raffleId,
        [Op.or]: [
          { status: 0 },
          { status: 1 }
        ]
      }
    })

    return count;
  } catch (err) {
    throw ({ status: err.status || 500, message: err.message || "Some error occurred while getting Raffles." });
  }
}

exports.getCountWin = async function (raffleId) {
  try {
    let count = await Participation.count({
      where: {
        raffle_id: raffleId,
        status: 2
      }
    })

    return count;
  } catch (err) {
    throw ({ status: err.status || 500, message: err.message || "Some error occurred while getting Raffles." });
  }
}
