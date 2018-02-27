const JwtStartegy = require('passport-jwt').Strategy ;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');
const config = require('./dbconfig');

module.exports = function(passport){
    let opt ={};
    opt.secretOrKey  = config.secret;
    opt.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    passport.use('jwt',new JwtStartegy(opt,function(jwt_payload,done){
        console.log(jwt_payload);
           User.findById(jwt_payload.data._id,function(err,user){
                if(err)
                {
                    return done(err,false);
                }
                else{
                    if(!user)
                    {
                        return done(null,false);
                    }
                    else{
                        return done(null,user);
                    }
                }
           });
    }));
}