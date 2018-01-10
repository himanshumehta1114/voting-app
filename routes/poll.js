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

router.getAllPolls = function(req, res){
    Poll.find({}).populate('admin').exec(function(err,polls){
        if(err){
            res.status(500).json({
                'info' : 'Internal server error',
                'status' : '500'
            })
        }else if(!polls){
            res.status(404).json({
                'info' : 'Polls not found',
                'status' : '404'
            })
        }else{
            res.status(200).json(polls);
        }
    })
};

router.getPollById = function(req, res){
    var pollId = req.params.pollId;

    Poll.find({
        '_id' : pollId
    }).exec(function(err,requestedPoll){
        if(err){
            res.status(500).json({
                'info' : 'internal server error',
                'status' : 500
            })
        }else if(!requestedPoll){
            res.status(404).json({
                'info' : 'poll not found',
                'status' : 404
            })
        }else{
            res.status(200).json(requestedPoll);
        }
    })
}

router.updateVotes = function(req, res){
    var pollId = req.body.pollId;
    var option = 'abc';
    Poll.findOneAndUpdate({
        '_id' : pollId,
        'options.name' : option
    },{
        '$inc' : {
            'options.$.value' : 1
        }
    }).exec(function(err, updatedVotes){
        res.json(updatedVotes);
    })
}

module.exports = router;
