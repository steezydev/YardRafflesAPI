const {Router} = require('express')
const router = Router();
const AnnounceController = require('../controllers/announce.controllers');
const announceValidation = require('../validation/announce.validator.js');

router.get('/getAnnounces', AnnounceController.getAllAnnounces)

router.get('/get/:id', announceValidation.getAnnounceById, AnnounceController.getAnnounceById)

router.post('/create', announceValidation.createAnnounce, AnnounceController.createAnnounce)

router.put('/update/:id', announceValidation.createAnnounce, AnnounceController.updateAnnounce)

router.delete('/delete/:id', announceValidation.getAnnounceById, AnnounceController.deleteAnnounce)

module.exports = router;