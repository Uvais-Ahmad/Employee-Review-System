const express = require('express');
const router = express.Router();

const homeCont = require('../controller/homeController');

router.get('/',homeCont.home);

module.exports = router;