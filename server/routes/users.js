const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const users = require('../controllers/users.js');
const catchAsync = require('../utils/catchAsync.js');
const {isLoggedIn, isAuthor, isAdmin, handleUserErrors} = require('../middleware.js');

// router.get('/', isLoggedIn, catchAsync(users.index));
router.get('/', isLoggedIn, isAdmin, catchAsync(users.index));

router.get('/topUsers', catchAsync(users.topUsers)); // Only the first top 10
router.get('/topAllUsers', catchAsync(users.topAllUsers)); // All the users

router.get('/profile', isLoggedIn, catchAsync(users.showUser));

router.get('/count', catchAsync(users.getUserCount));

router.put('/edit-profile', isLoggedIn, catchAsync(users.editUser), handleUserErrors); // We
// use "handleUserErrors" middleware after executing the controller because this middleware
// should have the values of the <input /> tags before evaluating them.


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