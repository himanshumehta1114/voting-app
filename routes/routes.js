const express = require('express');
const router = express.Router();
const auth = require('./auth.js');

router.post('/register', auth.createUser);
router.post('/login', auth.login);

module.exports = router;
