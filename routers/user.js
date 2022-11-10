const express = require('express');
const router = express.Router();

const userCont = require('../controller/user_controller');

//tO render login  /  register page
router.get('/login',userCont.login);
router.get('/register',userCont.register);

router.post('/create',userCont.create);
module.exports = router;