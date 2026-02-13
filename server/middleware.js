const Ad = require('./models/ad');
const ExpressError = require('./utils/ExpressError');
const {adSchema} = require('./schemas.js');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.session.user_id) {
        req.session.returnTo = req.originalUrl; // Storing the url that the user is trying to reach
        req.flash('error', 'You should login!');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateAd = (req, res, next) => {
    const {error} = adSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.isAuthor = async(req, res, next) => {
    const {id} = req.params;
    // First find the ad:
    const ad = await Ad.findById(id);
    // Continue ONLY IF the logged-in user is the owner of the ad:
    if (!ad.author.equals(req.user._id)) {
        req.flash('error', "You don't have the permission!");
        return res.redirect(`/ads/${id}`);
    }
    next();
}