const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const users = require('../controllers/users.js');
const catchAsync = require('../utils/catchAsync.js');
const {isLoggedIn, isAdmin} = require('../middleware.js');

// router.get('/', isLoggedIn, catchAsync(users.index));
router.get('/', isLoggedIn, isAdmin, catchAsync(users.index));

router.get('/profile', isLoggedIn, catchAsync(users.showUser));

// router.get('/:id', isLoggedIn, catchAsync(users.showAd));
router.delete("/:id", isLoggedIn, isAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

module.exports = router;