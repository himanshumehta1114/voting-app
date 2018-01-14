var Polls = require('../models/pollSchema.js');

module.exports = function(app,passport){
    app.get('/', function(req, res){
        if(req.isAuthenticated()){
            res.redirect('/profile');
        }else{
            Polls.find({}).populate('admin').exec(function(err, polls){
                if(err)
                    res.send('internal server error')
                res.render('index.ejs',{
                    message : req.flash('loginMessage'),
                    polls
                })
            })
        }
    });

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    })

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/',
        failureFlash : true
    }));

    app.get('/signup', function(req, res){
        res.render('signup',{
            message : req.flash('signupMessage')
        });
    })

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true
    }));

    app.get('/profile', isLoggedIn, function(req, res){
        console.log(`name is : ${req.user.name}`);
        console.log(`email is : ${req.user.email}`);
        console.log(`id is : ${req.user._id}`);
        Polls.find({
            'admin' : req.user._id
        }).exec(function(err,myPolls){
            res.render('profile',{
                name : req.user.name,
                myPolls
            });
        })
    });

    app.get('/removePoll/:pollId', isLoggedIn, function(req, res){
        var pollId = req.params.pollId;
        Polls.remove({
            '_id' : pollId,
            'admin' : req.user._id
        }).exec(function(err, removedPoll){
            if(err){
                res.json(err)
            }else{
                res.redirect('/profile');
            }
        })
    })

    app.post('/newPoll', isLoggedIn, function(req, res){
        var options = req.body.optionsList.split('\n');
        var optionsList = [];
        for(var i=0;i<options.length;i++){
            optionsList.push({
                name : options[i],
                value : 0
            })
        }
        var poll = new Polls({
            subject : req.body.subject,
            options : optionsList,
            admin : req.user._id
        });
        poll.save(function(err, savedPoll){
            if(err){
                res.json(err);
            }else if(!savedPoll){
                res.json('Nothing to save');
            }else{
                res.render('displayPoll',{
                    data : savedPoll.options,
                    id : poll._id,
                    name : poll.subject
                });
            }
        });
    })

    app.post('/poll/update', function(req, res){
        Polls.findOne({
            '_id' : req.body.id
        }).exec(function(err, poll){
            if(err){
                res.json('Internal error occurred');
            }else{
                var optionsList = poll.options;
                optionsList[req.body.vote].value += 1;
                poll.options = optionsList;
                poll.save(function(err){
                    if(err){
                        res.json('Unable to update votes');
                    }else{
                        res.redirect('/getPoll/' + req.body.id);
                    }
                })
            }
        })
    })

    app.get('/getPoll/:pollId', function(req, res){
        var pollId = req.params.pollId;
        Polls.findOne({
            '_id' : pollId
        }).populate('admin').exec(function(err, poll){
            if(err)
                res.json(err);
            if(!poll)
                res.json('poll not found');
            if(poll){
                res.render('displayPoll',{
                    data : poll.options,
                    id : poll._id,
                    name : poll.subject
                })
            }
                // res.json(poll);
        });
    })
};

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
        return next();

    res.redirect('/');
}
