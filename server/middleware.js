module.exports.isLoggedIn = (req, res, next) => {
    if (!req.session.user_id) {
        req.session.returnTo = req.originalUrl; // Storing the url that the user is trying to reach
        req.flash('error', 'You should login!');
        return res.redirect('/login');
    }
    next();
}