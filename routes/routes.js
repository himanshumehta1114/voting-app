var Polls = require('../models/pollSchema.js');

module.exports = function(app,passport){
    app.get('/', function(req, res){
        if(req.isAuthenticated()){
            res.redirect('/profile');
        }else{
            Polls.find({}).exec(function(err, polls){
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
        res.render('signup');
    })

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true
    }));

    app.get('/profile', isLoggedIn, function(req, res){
        console.log(`name is : ${req.user.name}`);
        console.log(`email is : ${req.user.email}`);
        res.render('profile',{
            name : req.user.name
        });
    });

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
                res.json(savedPoll);
            }
        });
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
            if(poll)
                res.json(poll);
        });
    })
};

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
        return next();

    res.redirect('/');
}
