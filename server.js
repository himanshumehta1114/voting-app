const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db_url = require('./config/db.js').db_url;
const port = process.env.PORT || 3000;
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

mongoose.connect(db_url).then(() => {
    console.log('mongoose is connected');
});

app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs');
require('./config/passport.js')(passport);

app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes/routes.js')(app,passport);

app.listen(port, function(){
    console.log(`server is up on port ${port}`);
})
