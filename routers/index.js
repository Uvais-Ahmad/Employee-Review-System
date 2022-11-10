const express = require('express');
const router = express.Router();

const homeCont = require('../controller/homeController');

router.get('/',homeCont.home);
router.use('/user',require('./user'));

module.exports = router;