const AnnounceService = require('../services/announceServices')
const TagsService = require('../services/tagServices')

exports.getAllAnnounces = async function (req, res, next) {
  const page = req.query.page
  const limit = parseInt(req.query.limit) || 10
  const sort = req.query.sort
  const sortDir = req.query.sort_dir
  const search = req.query.search

  try {
    const annouces = await AnnounceService.getAllAnnounces(page, limit, sort, sortDir, search)
    res.json({ data: annouces })
  } catch (err) {
    next(err)
  }
}

exports.getAnnounceById = async function (req, res, next) {
  const id = req.params.id

  try {
    const annouce = await AnnounceService.getAnnounceById(id)
    res.json({ data: annouce })
  } catch (err) {
    next(err)
  }
}

exports.createAnnounce = async function (req, res, next) {
  const newAnnounce = {
    title: req.body.title,
    work_name: req.body.work_name,
    images: req.body.images,
    message: req.body.message,
    publication_date: req.body.publication_date
  }

  const tags = req.body.tags

  try {
    await TagsService.checkTags(tags)

    const annouce = await AnnounceService.createAnnounce(newAnnounce, tags)
    res.json({ data: annouce })
  } catch (err) {
    next(err)
  }
}

exports.updateAnnounce = async function (req, res, next) {
  const id = req.params.id
  const updateAnnounce = {
    title: req.body.title,
    work_name: req.body.work_name,
    images: req.body.images,
    message: req.body.message,
    publication_date: req.body.publication_date
  }

  const tags = req.body.tags

  try {
    if (tags !== undefined && tags.length > 0) {
      await TagsService.checkTags(tags)
    }

    const annouce = await AnnounceService.updateAnnounce(id, updateAnnounce, tags)
    res.json({ data: annouce })
  } catch (err) {
    next(err)
  }
}

exports.deleteAnnounce = async function (req, res, next) {
  const id = req.params.id

  try {
    await AnnounceService.deleteAnnounce(id)
    res.json({ data: 1 })
  } catch (err) {
    next(err)
  }
}
