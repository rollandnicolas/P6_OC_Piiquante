const express = require('express');
const router = express.Router();

// const auth
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer-config');


const saucesCtrl = require('../controllers/sauce');

router.get('/', saucesCtrl.getAllSauces);
router.post('/',auth, multer, saucesCtrl.createSauce);
router.get('/:id', saucesCtrl.getSauceById);
/*router.put('/:id', saucesCtrl.updateSauceById);
router.delete('/:id', saucesCtrl.deleteSauceById);
router.post('/:id/like', saucesCtrl.likeSauceById);*/

module.exports = router;