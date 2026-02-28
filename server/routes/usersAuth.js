const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const usersAuth = require('../controllers/usersAuth.js');
const catchAsync = require('../utils/catchAsync.js');

router.route('/register')
    .post(catchAsync(usersAuth.register));
// router.post('/register', catchAsync(usersAuth.register));

router.route('/login')
    // .get(usersAuth.renderLogin)
    .post(catchAsync(usersAuth.login));
// router.get('/login', usersAuth.renderLogin);
// router.post('/login', catchAsync(usersAuth.login));
router.get("/current-user", async (req, res) => {
  if (!req.session.user_id) {
    return res.json({ user: null });
  }
  const user = await User.findById(req.session.user_id).select("username role");
  if (!user) {
    return res.json({ user: null });
  }
  res.json({ user });
});

router.post('/logout', usersAuth.logout);

module.exports = router;