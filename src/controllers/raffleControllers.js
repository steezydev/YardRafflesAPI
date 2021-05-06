const RaffleService = require('../services/raffleServices')
const TagsService = require('../services/tagServices')

exports.getRaffleList = async function (req, res, next) {
  const page = req.query.page
  console.log(page)
  const limit = parseInt(req.query.limit) || 10
  const sort = req.query.sort
  const sortDir = req.query.sort_dir
  const search = req.query.search

  try {
    const raffles = await RaffleService.getRaffleList(page, limit, sort, sortDir, search)
    res.json({ data: raffles })
  } catch (err) {
    next(err)
  }
}

exports.getRaffleData = async function (req, res, next) {
  const id = req.params.id

  try {
    const raffle = await RaffleService.getRaffleData(id)
    res.json({ data: raffle })
  } catch (err) {
    next(err)
  }
}

exports.createRaffle = async function (req, res, next) {
  const newRaffle = {
    title: req.body.title,
    work_name: req.body.work_name,
    images: req.body.images,
    message: req.body.message,
    link: req.body.link,
    sizes: req.body.sizes,
    publication_date: req.body.publication_date,
    close_date: req.body.close_date,
    results_date: req.body.results_date,
    profit: req.body.profit
  }

  const tags = req.body.tags

  try {
    await TagsService.checkTags(tags)

    const raffle = await RaffleService.createRaffle(newRaffle, tags)
    res.json({ data: raffle })
  } catch (err) {
    next(err)
  }
}

exports.updateRaffle = async function (req, res, next) {
  const id = req.params.id

  const updateRaffle = {
    title: req.body.title,
    work_name: req.body.work_name,
    images: req.body.images,
    message: req.body.message,
    link: req.body.link,
    sizes: req.body.sizes,
    publication_date: req.body.publication_date,
    close_date: req.body.close_date,
    results_date: req.body.results_date,
    profit: req.body.profit
  }

  const tags = req.body.tags

  try {
    if (tags !== undefined && tags.length > 0) {
      await TagsService.checkTags(tags)
    }

    const raffle = await RaffleService.updateRaffle(id, updateRaffle, tags)
    res.json({ data: raffle })
  } catch (err) {
    next(err)
  }
}

exports.deleteRaffle = async function (req, res, next) {
  const id = req.params.id

  try {
    await RaffleService.deleteRaffle(id)
    res.json({ data: 1 })
  } catch (err) {
    next(err)
  }
}
