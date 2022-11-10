const express = require('express');
const router = express.Router();

const userCont = require('../controller/user_controller');

router.get('/login',userCont.login);
router.get('/register',userCont.register);

module.exports = router;