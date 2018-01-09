const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
    }
    ,
    // tokens :[{
    //         access : {
    //             type : String,
    //             require : true
    //         },
    //         token : {
    //             type : String,
    //             required : true
    //         }
    //     }]
})

// userSchema.methods.toJSON = function(){
//     var user = this;
//     return {
//         name : user.name,
//         email : user.email
//     }
// }
//
// userSchema.methods.generateAuthToken = function(){
//     var user = this;
//     var access = access;
//     var token = jwt.sign({_id : user._id.toHexString(), access},'test').toString();
//
//     user.tokens.push({token,access});
//
//     return user.save().then(() => {
//         return token;
//     });
// };
//
// userSchema.pre('save', function(next){
//     var user = this;
//
//     if(user.isModified('password')){
//         bcrypt.genSalt(10, (err,salt) => {
//             bcrypt.hash(user.password,salt, (err,hash) => {
//                 user.password = hash;
//                 next();
//             })
//         })
//     }else{
//         next();
//     }
// });
//
// userSchema.statics.findByCredentials = function(email,password) {
//     var user = this;
//     return user.findOne({email}).then((user) => {
//         if(!user){
//             console.log('invalid user name');
//             return Promise.reject();
//         }
//
//         return new Promise((resolve, reject) => {
//             bcrypt.compare(password, user.password, (err, res) => {
//                 if(res){
//                     resolve(user);
//                 }else{
//                     console.log('invalid password');
//                     reject();
//                 }
//             })
//         })
//     })
// };
//
// userSchema.static.removeToken = function(token){
//     var user = this;
//
//     return user.update({
//         $pull : {
//             tokens : {token}
//         }
//     });
// };

module.exports = mongoose.model('user', userSchema);
