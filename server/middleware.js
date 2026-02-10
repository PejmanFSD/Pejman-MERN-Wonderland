module.exports.isLoggedIn = (req, res, next) => {    
    if (!req.session.user_id) {
        req.flash('error', 'You should login!');
        return res.redirect('/login');
    }
    next();
}