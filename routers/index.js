const express = require('express');
const router = express.Router();

const homeCont = require('../controller/homeController');
const passport = require('passport');


router.get('/',passport.checkAuthentication,homeCont.home);
router.use('/user',require('./user'));

module.exports = router;