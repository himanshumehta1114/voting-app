const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        match : /\S+@\S+\.\S+/,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    tokens :[{
            access : {
                type : String,
                require : true
            },
            token : {
                type : String,
                required : true
            }
        }]
})

userSchema.methods.toJSON = function(){
    var user = this;
    return {
        name : user.name,
        email : user.email
    }
}

userSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = access;
    var token = jwt.sign({_id : user._id.toHexString(), access},'test').toString();

    user.tokens.push({token,access});

    return user.save().then(() => {
        return token;
    });
};

module.exports = mongoose.model('user', userSchema);
