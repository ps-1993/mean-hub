const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name:
    {
        type:String
    },
    username:{
        type:String,
        required :true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
});

const User = module.exports= mongoose.model("User",userSchema);

module.exports.addUser = function(newUser,callback){
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(newUser.password,salt,function(err,newPassword){
            if(err)
            {
                throw err;
            }
            else{
            newUser.password = newPassword;
            newUser.save(callback);
            }
        })
    });
}

module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
}

module.exports.getUserByUsername = function(username,callback){
    const query = {username:username};
    User.findOne(query,callback);
}

module.exports.confirmPassword = function(password,hash,callback)
{
    bcrypt.compare(password,hash,function(err,isMatch){
        if(err){
        callback(err,null);
        }
        else{
            callback(null,isMatch);
        }
    })
}