const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
// passport local
const passport = require('passport');
const session = require('express-session');
const passportLocal = require('./config/passport-local');


// EJS setup
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));



//Layout setup
app.use(expressLayout);
// add cookies
app.use(cookieParser());

// Static setup
app.use(express.static('assets'))

// Layout setup
app.set('layout extractStyle',true);
app.set('layout extractScript',true)

app.use(express.urlencoded({extended:true}));

app.use( session({
    name :'EmployeeReviewSystem',secret:'UvRushi',
    saveUninitialized : false , resave :false,
    cookie : {
        maxAge : (1000*60*100)
    }
})) 

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/',require('./routers/index'))

app.listen(port , function(err){
    if(err){ console.log('Issue comes while creating server ', err)}
    console.log('Server is runnig employee review on port ',port);
})