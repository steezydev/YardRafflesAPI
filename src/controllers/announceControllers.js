const AnnounceService = require('../services/announceServices')
const TagsService  = require('../services/tagServices')

exports.getAllAnnounces = async function (req, res, next) {
  let page = req.params.page

  let 
    limit = parseInt(req.query.limit) || 10,
    sort = req.query.sort,
    sort_dir = req.query.sort_dir,
    search = req.query.search

  try {
    let annouces = await AnnounceService.getAllAnnounces(page, limit, sort, sort_dir, search)
    res.json({ data: annouces })
  } catch (err) {
    next(err)
  }
}

exports.getAnnounceById = async function (req, res, next) {
  let id = req.params.id

  try {
    let annouce = await AnnounceService.getAnnounceById(id)
    res.json({ data: annouce })
  } catch (err) {
    next(err)
  }
}

exports.createAnnounce = async function (req, res, next) {
  let newAnnounce = {
    "title": req.body.title,
    "work_name": req.body.work_name,
    "images": req.body.images,
    "message": req.body.message,
    "publication_date": req.body.publication_date
  }

  let tags = req.body.tags

  try {
    await TagsService.checkTags(tags);

    let annouce = await AnnounceService.createAnnounce(newAnnounce, tags)
    res.json({ data: annouce })
  } catch (err) {
    next(err)
  }
}

exports.updateAnnounce = async function (req, res, next) {
  let id = req.params.id
  let updateAnnounce = {
    "title": req.body.title,
    "work_name": req.body.work_name,
    "images": req.body.images,
    "message": req.body.message,
    "publication_date": req.body.publication_date,
  }
  
  let tags = req.body.tags

  try {
    await TagsService.checkTags(tags);

    let annouce = await AnnounceService.updateAnnounce(id, updateAnnounce, tags)
    res.json({ data: annouce })
  } catch (err) {
    next(err)
  }
}

exports.deleteAnnounce = async function (req, res, next) {
  let id = req.params.id

  try {
    let annouce = await AnnounceService.deleteAnnounce(id)
    res.json({ data: 1 })
  } catch (err) {
    next(err)
  }
}