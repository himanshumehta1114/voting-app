const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('./models/db');
const bodyParser = require('body-parser');
const User = require('./models/userSchema');

app.use(bodyParser.json());

app.post('/register', function(req, res){
    var body = {
        name : req.body.name,
        password : req.body.password,
        email : req.body.email
    };

    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    })
})

app.get('/', function(req, res){
        res.send('Hello');
})

app.listen(port, function(req, res){
    console.log(`Server is up on port ${port}`);
})
