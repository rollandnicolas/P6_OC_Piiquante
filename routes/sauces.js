const express = require('express');
const router = express.Router();

// const auth
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer-config');


const saucesCtrl = require('../controllers/sauce');

router.get('/', auth, saucesCtrl.getAllSauces);
router.post('/', auth, multer, saucesCtrl.createSauce);
router.get('/:id', auth, saucesCtrl.getSauceById);
router.put('/:id', auth, multer, saucesCtrl.updateSauceById);
router.delete('/:id', auth, saucesCtrl.deleteSauceById);
router.post('/:id/like', auth, saucesCtrl.likeSauceById);

module.exports = router;