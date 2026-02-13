const express = require('express');
const router = express.Router();
const users = require('../controllers/users.js');
const catchAsync = require('../utils/catchAsync.js');
const {isLoggedIn} = require('../middleware.js');

router.get('/', isLoggedIn, catchAsync(users.index));

router.get('/:id', isLoggedIn, catchAsync(users.showAd));

module.exports = router;