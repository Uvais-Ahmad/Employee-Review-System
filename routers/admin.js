const express = require('express');
const router = express.Router();
const passport = require('passport');

const adminCont = require('../controller/admin_controller');

// Showing the assign work page
router.get('/assign-work',passport.checkAuthentication,adminCont.assignWork);

// Showing all list of employees
router.get('/allEmployee',passport.checkAuthentication,adminCont.allEmployee);

// handle the assigning work 
router.post('/assign-work',passport.checkAuthentication,adminCont.handleAssignWork);

// handle to add employee as admin
router.post('/addToAdmin',passport.checkAuthentication,adminCont.addToAdmin);

module.exports = router;