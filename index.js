const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');

// EJS setup
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//Layout setup
app.use(expressLayout);

app.use(express.static('assets'))

app.set('layout extractStyle',true);
app.set('layout extractScript',true)

app.use('/',require('./routers/index'))

app.listen(port , function(err){
    if(err){ console.log('Issue comes while creating server ', err)}
    console.log('Server is runnig employee review on port ',port);
})