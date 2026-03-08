const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const users = require('../controllers/users.js');
const catchAsync = require('../utils/catchAsync.js');
const {isLoggedIn, isAuthor, isAdmin} = require('../middleware.js');

// router.get('/', isLoggedIn, catchAsync(users.index));
router.get('/', isLoggedIn, isAdmin, catchAsync(users.index));

router.get('/profile', isLoggedIn, catchAsync(users.showUser));

router.put('/edit-profile', isLoggedIn, catchAsync(users.editUser));

// Just for editing the password:
router.put('/change-password', isLoggedIn, catchAsync(users.changePassword));

// For updating the "totalPoint" of each user:
router.patch("/update-points", isLoggedIn, users.updatePoints);

// router.get('/:id', isLoggedIn, catchAsync(users.showAd));
router.delete("/:id", isLoggedIn, isAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

module.exports = router;