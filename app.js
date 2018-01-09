const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('./models/db');
const bodyParser = require('body-parser');
const User = require('./models/userSchema');
const Poll = require('./models/pollSchema');
var routes = require('./routes/routes.js');
app.use(bodyParser.json());
app.use('/api', routes);
// app.post('/register', function(req, res){
//     var body = {
//         name : req.body.name,
//         password : req.body.password,
//         email : req.body.email
//     };
//
//     var user = new User(body);
//
//     user.save().then(() => {
//         return user.generateAuthToken();
//     }).then((token) => {
//         res.header('x-auth', token).send(user);
//     })
// })
//
// app.post('/newPoll', function(req, res){
//     var polls = {
//         subject : "This is first poll",
//         options : [{
//             name : 'option 1',
//             value : '1'
//         }],
//         admin : "5a50c2b91388f447c4f81400"
//     }
//
//     var newPoll = new Poll(polls);
//
//     newPoll.save().then((polls) => {
//         res.send(polls);
//     })
// })
//
// app.get('/getPoll', function(req, res){
//     Poll.findOne({
//         "_id" : "5a54586581d22614738c3b74"
//     }).populate('admin').then((poll) => {
//         res.send(poll);
//     })
// });
//
// app.get('/polls', function(req,res){
//     Poll.find().then((polls) => {
//         res.send(polls);
//     })
// })
//
// app.post('/login', function(req, res) {
//     var body = {
//         email : req.body.email,
//         password : req.body.password
//     };
//
//     User.findByCredentials(body.email,body.password).then((user) => {
//         return user.generateAuthToken().then((token) => {
//             res.header('x-auth', token).send(user);
//         });
//     }).catch((e) => {
//         res.status(400).send();
//     })
// })
//
// app.delete('/login', function(req,res) {
//     req.user.removeToken(req.token).then(() => {
//         res.status(200).send();
//     }, () => {
//         res.status(400).send();
//     });
// });
//
// app.get('/', function(req, res){
//         res.send('Hello');
// })

app.listen(port, function(req, res){
    console.log(`Server is up on port ${port}`);
})
