const passport = require('passport');
console.log('passport local file');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/users');

//done is a callback function 
passport.use(new localStrategy({
    usernameFeild : 'email'
    },function( email , password , done ){
        User.findOne( {email : email}, function( err , user ){
            if(err){
                return done(err);
            }

            if( !user || user.password != password ){
                return done(null , false);
            }

            return done(null , user);
        })
    }
))

// this function used when we create session . it store encrpt key to client browser
passport.serializeUser(function( user , done ){
    console.log('called serialllized')
    return done(null , user);
})

// this use while we are using that encrypted key
passport.deserializeUser( function (id , done ){
    console.log('called deserialllized')
    User.findById(id , function(err , user ){
        if(err){
            console.log('Error occur while deserializeUser ',err);
            done(err);
        }
        return done(null , user);
    })
});

passport.checkAuthentication = function(req , res , next ){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/user/login');
}

passport.setAuthenticatedUser = function( req , res ,next ){
    if(req.isAuthenticated()){
        req.local.user = req.user;
    }
    next();
}

module.exports = passport;