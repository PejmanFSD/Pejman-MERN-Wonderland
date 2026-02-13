const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res) => {
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
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = async (req, res) => {
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
}

module.exports.logout = (req, res) => {
    req.session.user_id = null;
    req.flash('success', 'Successfully logged-out!');
    res.redirect('/login');
}