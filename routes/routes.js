const express = require('express');
const router = express.Router();
const auth = require('./auth.js');
const poll = require('./poll.js');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.authenticate = function(req, res, next){
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
};

// router.post('/register', auth.createUser);
// router.post('/login', auth.login);
router.post('/newPoll', router.authenticate, poll.newPoll);
router.get('/getAllPolls', poll.getAllPolls);
router.get('/getPoll/:pollId',poll.getPollById);
router.post('/updateVotes', router.authenticate,poll.updateVotes);

module.exports = router;
