const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const oauth = require('./oauth');

const User = require('../models/user');

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.getUserById(id).then((user)=>{
        done(null,user);
    })
});

passport.use(new GoogleStrategy( {
    clientID :oauth.google.clientID,
    clientSecret :oauth.google.clientSecret,
    callbackURL :oauth.google.callbackURL
},
(accessToken,refreshToken,profile,done)=>{
    User.findOne({googleId:profile.id}).then((currentUser)=>{
            if(currentUser)
            {
                console("User already exists in DB !!!");
                done(null,currentUser);
            }
            else
            {
                new User
                ({
                    username:profile.displayName,
                    googleId:profile.id
                }).save().then((newUser)=>
                {
                    console.log("New User created with google profile info -->"+newUser);
                    done(null,newUser);
                })
            }
        })    
}
));
