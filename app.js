const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors  = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const config = require('./config/dbconfig');

const users = require('./routes/user-route');

const app = express();

const PORT = 3000;

mongoose.connect(config.database);

mongoose.connection.on('connected',function(){
    console.log("Connected to MongoDB");
});
mongoose.connection.on('error',function(err){
    console.log("Database error :"+err);
});

//used to convert post json data
app.use(bodyParser.json());


//for cross domain calls
app.use(cors());

//apply passport middleware for authentication and token, check notes on session and intialize
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/user',users);
app.use(express.static(path.join(__dirname,'public')));

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'public/index.html'));
});

app.listen(PORT,function(){
    console.log('server started on '+PORT);
});


