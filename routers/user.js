const express = require('express');
const router = express.Router();
const passport = require('passport');

const userCont = require('../controller/user_controller');

//tO render login  /  register page
router.get('/login',userCont.login);
router.get('/register',userCont.register);

router.post('/create',userCont.create);

// ,passport.authenticate('local',{failureRedirect : '/user/login'})
router.post('/create-session',passport.authenticate('local',{failureRedirect : '/user/login'}),userCont.createSession);

router.get('/logout',userCont.destroySession);

router.post('/adding-review',userCont.addingReview);

router.use('/admin',require('./admin'));



module.exports = router;