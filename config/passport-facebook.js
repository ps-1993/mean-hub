const passport = require('passport');

const facebookStrategy = require('passport-facebook');

const oauth = require('./oauth');

passport.use(new facebookStrategy( {
clientID :oauth.facebook.clientID,
clientSecret :oauth.facebook.clientSecret,
callbackURL :oauth.facebook.callbackURL
},
()=>
{
    console.log("facebook loogedin");
}
));