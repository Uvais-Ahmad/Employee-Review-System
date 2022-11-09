const express = require('express');
const app = express();
const port = 8000;
const path = require('path');

app.use('/',require('./routers/index'))

// EJS setup
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.listen(port , function(err){
    if(err){ console.log('Issue comes while creating server ', err)}
    console.log('Server is runnig employee review on port ',port);
})