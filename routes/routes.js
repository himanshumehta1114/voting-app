const express = require('express');
const router = express.Router();
const auth = require('./auth.js');
const poll = require('./poll.js');
const jwt = require('jsonwebtoken');

router.use(function(req, res, next){
    var token = req.headers['x-auth'];
    if(token){
        jwt.verify(token, 'secret', function(err, decoded){
            if(err){
                return res.status(401).json({
                    "message" : "Authentication failed"
                })
            }else{
                req.userId = decoded.userId;
                req.email = decoded.email;
                next();
            }
        });
    }else{
        return res.status(403).send({
            success : false,
            message : "No token provided"
        })
    }
})

// router.post('/register', auth.createUser);
// router.post('/login', auth.login);
router.post('/newPoll', poll.newPoll);
router.get('/getAllPolls', poll.getAllPolls);
router.get('/getPoll/:pollId', poll.getPollById);

module.exports = router;
