const BotService = require('../services/BotServices')
const RaffleService = require('../services/raffleServices')

exports.getBotUser = async (req, res, next) => {
  const telegramId = req.params.telegramId

  try {
    const user = await BotService.getBotUser(telegramId)
    res.json({ data: user })
  } catch (err) {
    next(err)
  }
}

exports.addBotUser = async (req, res, next) => {
  const newUser = {
    username: req.body.username,
    telegramLink: req.body.telegramLink,
    phone: req.body.phone,
    email: req.body.email,
    telegramId: req.body.telegramId
  }

  try {
    const user = await BotService.addUser(newUser)
    res.json({ data: user })
  } catch (err) {
    next(err)
  }
}

exports.updateBotUser = async (req, res, next) => {
  const telegramId = req.params.telegramId
  const updateUser = {
    username: req.body.username,
    telegramLink: req.body.telegramLink,
    phone: req.body.phone,
    email: req.body.email
  }

  try {
    const user = await BotService.updateUser(telegramId, updateUser)
    res.json({ data: user })
  } catch (err) {
    next(err)
  }
}

exports.getBotRafflesToPost = async (req, res, next) => {
  try {
    const raffles = await RaffleService.getRafflesToPost()
    res.json({ data: raffles })
  } catch (err) {
    next(err)
  }
}

exports.getBotCurrentRaffles = async (req, res, next) => {
  try {
    const raffles = await BotService.getCurrentRaffles()
    res.json({ data: raffles })
  } catch (err) {
    next(err)
  }
}

exports.getRaffle = async (req, res, next) => {
  const id = req.params.id

  try {
    const raffle = await BotService.getRaffle(id)
    res.json({ data: raffle })
  } catch (err) {
    next(err)
  }
}

exports.addPartRaffle = async (req, res, next) => {
  const id = req.params.id
  const telegramId = req.query.telegramId

  try {
    const raffle = await BotService.addPartRaffle(id, telegramId)
    res.json({ data: raffle })
  } catch (err) {
    next(err)
  }
}

exports.confirmParticipation = async (req, res, next) => {
  const id = req.params.id
  const telegramId = req.query.telegramId

  try {
    const raffle = await BotService.confirmParticipation(id, telegramId)
    res.json({ data: raffle })
  } catch (err) {
    next(err)
  }
}

exports.confirmSuccess = async (req, res, next) => {
  const id = req.params.id
  const telegramId = req.query.telegramId

  try {
    const raffle = await BotService.confirmSuccess(id, telegramId)
    res.json({ data: raffle })
  } catch (err) {
    next(err)
  }
}
