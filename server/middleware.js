const Ad = require("./models/ad");
const User = require("./models/user");
const ExpressError = require("./utils/ExpressError");
const { adSchema } = require("./schemas.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.session.user_id) {
    // req.session.returnTo = req.originalUrl; // Storing the url that the user is trying to reach
    // req.flash('error', 'You should login!');
    // return res.redirect('/login');
    return;
  }
  next();
};
// In order to stop the already logged-in users to login again or register:
module.exports.isLoggedOut = (req, res, next) => {
  if (req.session.user_id) {
    return res.status(400).json({
      error: "You are already logged in. You should logout first!",
    });
  }
  next();
};

module.exports.validateAd = (req, res, next) => {
  const { error } = adSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  // First find the ad:
  const ad = await Ad.findById(id);
  if (!ad) {
    return res.status(404).json({ error: "Ad not found" });
  }
  // Continue ONLY IF the logged-in user is the owner of the ad:
  if (!ad.author.equals(req.session.user_id) && req.user.username !== "Pejman") {
    // req.flash('error', "You don't have the permission!");
    return res.status(403).json({
      error: "You're not the creator of this ad",
    });
  }
  next();
};

module.exports.isAdmin = async (req, res, next) => {
  // First check if the user is logged-in:
  if (!req.session.user_id) {
    return res.status(401).json({ error: "Not logged in" });
  }
  // Fetch the logged-in user:
  const user = await User.findById(req.session.user_id);
  // Check if the logged-in user is admin:
  if (user.role !== "Admin") {
    return res.status(403).json({ error: "Admin access only!" });
  }
  next();
};
// The middleware that makes Pejman the super admin who
// can edit/delete the ads of other admins:
module.exports.isPejman = async (req, res, next) => {
  const { id } = req.params;
  const ad = await Ad.findById(id);
  if (!ad) {
    return res.status(404).json({ error: "Ad not found" });
  }
  const user = req.user;
  // Super admin exception:
  if (user.username === "Pejman") {
    return next();
  }
  // Normal admin -> must be the creator of the ad:
  if (!ad.author.equals(user._id)) {
    return res.status(403).json({ error: "You are not the author of this ad" });
  }
  next();
};