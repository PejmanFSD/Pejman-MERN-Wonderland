const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {userSchema} = require('../schemas.js');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

router.get('/register', (req, res) => {
    res.render('users/register');
})

router.post('/register', catchAsync(async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        // Right before the "save" method, the password will be hashed (in models/user.js)
        await user.save();
        req.session.user_id = user._id;
        req.flash('success', 'Welcome!');
        res.redirect('./secret');
    } catch(e) {
        req.flash('error', 'Something is wrong!');
        res.redirect('/');
    }
}))

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/login', catchAsync(async (req, res) => {
    try {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password);
        if (foundUser) {
            req.session.user_id = foundUser._id;
            req.flash('success', 'Welcome Back!');
            // Redirecting the user (who hadn't logged-in) to the page
            // that they had tried to reach before logging-in:
            const redirectUrl = req.session.returnTo || './secret'; // './secret' is for the situation
            // where they click on the "Login" button at first.
            // We don't want the "returnTo" key remains in the session:
            delete req.session.returnTo;
            res.redirect(redirectUrl);
        }
    } catch(e) {
        req.flash('error', 'Something is wrong!');
        res.redirect('/');
    }
}))

router.post('/logout', (req, res) => {
    req.session.user_id = null;
    req.flash('success', 'Successfully logged-out!');
    res.redirect('/login');
})

module.exports = router;