const dotenv = require('dotenv').config();

const mongoose = require('mongoose');
console.log("Process Env ",process.env.MONGODB_URL);

mongoose.connect(process.env.MONGODB_URL);
console.log("mongoose connection");
const db = mongoose.connection;

db.on("error",console.error.bind(console,"Error occur while making mongoose connection"));

db.once('open',function(){
    console.log("Connection success to mongoose .");
});

module.exports = db;