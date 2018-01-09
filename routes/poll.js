const express = require('express');
const router = express.Router();
const Poll = require('../models/pollSchema');

router.newPoll = function(req, res){
    var poll = new Poll({
        subject : req.body.subject,
        options : req.body.options,
        admin : req.userId
    });

    poll.save(function(err,savedPoll){
        if(err){
            return res.status(500).json(err);
        }else if(!savedPoll){
            return res.status(404).json("insertion failed");
        }else{
            res.status(200).send(savedPoll);
        }
    });
};

module.exports = router;
