const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors  = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const config = require('./config/dbconfig');

const users = require('./routes/user-route');

const cookieSession = require('cookie-session');

const app = express();

const passport_facebook = require('./config/passport-facebook');
const passport_google = require('./config/passport-google');

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
// app.use(bodyParser.urlencoded({ extended: true }));


//for cross domain calls
app.use(cors());

//apply cookie session middleware
app.use(cookieSession({
    maxAge : 24*60*60*1000,
    keys:[config.session]
}))

//apply passport middleware for authentication and token, check notes on session and intialize
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/user',users);
app.use(express.static(path.join(__dirname,'public')));

app.get('/auth/google',passport.authenticate('google',{
    session:false,
    scope:['profile']
}));

app.get('/auth/facebook',passport.authenticate('facebook',{
    scope:['email']
}));

app.get('/auth/facebook/redirect',passport.authenticate('facebook'),(req,res,next)=>
{
    res.send("Successfully looged in with facebook credentials !!!!!!!!!!!");
}); 

app.get('/auth/google/redirect',passport.authenticate('google' ,{ session: false }),(req,res)=>
{
    res.redirect('user/profile')
});

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'public/index.html'));
});

app.listen(PORT,function(){
    console.log('server started on '+PORT);
});


