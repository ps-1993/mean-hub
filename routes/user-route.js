const express = require('express');
const User = require('../models/user');

const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/dbconfig');


router.post('/register',function(req,res,next){
    let userToAdd = new User({
        name:req.body.name,
        username : req.body.username,
        password :  req.body.password,
        email :  req.body.email
    });
    User.addUser (userToAdd,function(err,newUser){
        if(err)
        {
            res.json({success : false,msg:"Failed to register user!!!"})
        }
        res.json({success : true,msg:"User registered successfully...."});
    })
});


router.post('/authenticate',function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username,function(err,user){
        if(err){
            res.send({status:false,msg:"Something gone wrong ... Please try again !!!"});
        }
        else{
            if(!user)
            {
                res.send({status:false,msg:"No User with this username found !!!"});
            }
            else{
            User.confirmPassword(password,user.password,function(err,isMatch){
                if(err){
                    res.send({status:false,msg:"Something gone wrong ... Please try again !!!"});
                }
                else{
                    if(isMatch){
                        const token = jwt.sign({data:user},config.secret,{
                            expiresIn:180
                        })
                        res.send({
                            status:true,
                            token:'JWT '+token,
                            user:{
                            name:user.name,
                            username:user.username,
                            email:user.email
                            }
                        });
                    }
                    else{
                        res.send({status:false,msg:"Incorrect Password/Username !!!!!!!!!"});
                    }
                }
            })
        }
        }
    })
});

router.get('/profile',passport.authenticate('jwt',{session:false}),function(req,res){
    res.json({user:req.user});
});

module.exports = router ;