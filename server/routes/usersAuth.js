const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const usersAuth = require('../controllers/usersAuth.js');
const catchAsync = require('../utils/catchAsync.js');

router.get('/register', usersAuth.renderRegister);

router.post('/register', catchAsync(usersAuth.register));

router.get('/login', usersAuth.renderLogin);

router.post('/login', catchAsync(usersAuth.login));

router.post('/logout', usersAuth.logout);

module.exports = router;