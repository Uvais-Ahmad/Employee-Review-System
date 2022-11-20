const express = require('express');
const router = express.Router();
const passport = require('passport');

const adminCont = require('../controller/admin_controller');

// Showing the assign work page
router.get('/assign-work',passport.checkAuthentication,adminCont.assignWork);

// Showing all list of employees
router.get('/allEmployee',passport.checkAuthentication,adminCont.allEmployee);

// handle the assigning work 
router.post('/handleAssign-work',passport.checkAuthentication,adminCont.handleCreateReview);

// handle to add employee as admin
router.post('/addToAdmin',passport.checkAuthentication,adminCont.addToAdmin);

// To remove Employee as a admin
router.get('/removeFromAdmin/:id' , passport.checkAuthentication , adminCont.removeFromAdmin);

router.get('/removeEmp/:id', passport.checkAuthentication , adminCont.removeEmp);

module.exports = router;