const express = require('express');
const router = express.Router();
const auth = require('./auth.js');
const poll = require('./poll.js');

router.post('/register', auth.createUser);
router.post('/login', auth.login);
router.post('/newPoll', poll.newPoll);

module.exports = router;
