const express = require('express');
const router = express.Router();
const passport = require('passport');

const adminCont = require('../controller/admin_controller');

router.get('/assign-work',passport.checkAuthentication,adminCont.assignWork);

router.get('/allEmployee',passport.checkAuthentication,adminCont.allEmployee);

module.exports = router;