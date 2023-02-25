const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const limiter = require("../middlewares/limiter");
const passwordCtrl = require("../middlewares/passwordCheck");

router.post('/signup', passwordCtrl, userCtrl.signup);
router.post('/login', limiter, userCtrl.login);

module.exports = router;