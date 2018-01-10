const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userSchema');
const async = require('async');
const jwt = require('jsonwebtoken');

var createPasswordHash = function(req, callback){
    var saltRounds = 10;
    var password = req.body.password;

    bcrypt.hash(password,saltRounds).then((hash) => {
        console.log(`Hash for password ${password} is : ${hash}`);
        callback(null, hash);
    })
}

var newUser = function(req, hash, callback){
    var user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hash
    });

    user.save(function(err, savedUser){
        if(err){
            res.status(500).send(err);
        }
        console.log(savedUser);
        callback(null, savedUser);
    })
};

router.createUser = function(req, res){
    async.waterfall([
        function(callback){
            createPasswordHash(req, callback);
        },
        function(hash,callback){
            newUser(req, hash, callback);
        }
    ], function(err, savedUser){
        if(err){
            res.send(err);
        }else{
            var newUserDetails = {
                name : savedUser.name,
                email : savedUser.email
            };
            res.send(newUserDetails);
        }
    });
}

router.login = function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    var userId;
    async.waterfall([
        function(callback){
            User.findOne({
                email : req.body.email
            }).exec(function(err, loginUserDetails){
                if(err){
                    res.status(500).send(err);
                }else if(!loginUserDetails){
                    res.status(401).json({
                        "info" : "invalid email",
                        "status" : 401
                    });
                }else{
                    userId = loginUserDetails._id;
                    var check = {};
                    bcrypt.compare(req.body.password,loginUserDetails.password, function(err,result){
                        check.value = result;
                        if(result == false){
                            res.status(401).send({
                                "info" : "invalid password",
                                "status" : "401"
                            })
                        }else if(result == true){
                            callback(null,check);
                        }
                    })
                }
            });
        },function(check,callback){
            if(check.value == true){
                var token = jwt.sign({
                    userId,
                    email,
                    password
                }, 'secret');
                check.token = token;
                check.userId = userId;
                check.email = email;
                callback(null,check);
            }
        }
    ],function(err,check){
        res.header('x-auth',check.token).send(check);
    })
}
module.exports = router;
