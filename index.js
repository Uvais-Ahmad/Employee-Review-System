const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const expressLayout = require('express-ejs-layouts');

// EJS setup
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//Layout setup
app.use(expressLayout);

app.use('/',require('./routers/index'))

app.listen(port , function(err){
    if(err){ console.log('Issue comes while creating server ', err)}
    console.log('Server is runnig employee review on port ',port);
})