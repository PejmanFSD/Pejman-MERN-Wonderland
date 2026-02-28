const User = require("../models/user");
require("dotenv").config();

module.exports.register = async (req, res) => {
  try {
    const { username, password, role, adminSecret } = req.body;
    let finalRole = "Player";
    if (role === "Admin") {
      if (adminSecret !== process.env.ADMIN_SECRET) {
        return res.status(403).json({
          error: "Invalid admin secret",
        });
      }
      finalRole = "Admin";
    }
    const user = new User({ username, password, role: finalRole });
    // Right before the "save" method, the password will be hashed (in models/user.js)
    await user.save();
    req.session.user_id = user._id;
    // req.flash('success', 'Welcome!');
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      },
    });
  } catch (e) {
    // req.flash('error', 'Something is wrong!');
    res.status(400).json({
      error: e.message,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if (!foundUser) {
      return res.status(401).json({
        error: "Invalid username or password"
      });
    }
    req.session.user_id = foundUser._id;
    req.session.role = foundUser.role;
    // req.flash("success", "Welcome Back!");
    // Redirecting the user (who hadn't logged-in) to the page
    // that they had tried to reach before logging-in:
    // const redirectUrl = req.session.returnTo || "./secret"; // './secret' is for the situation
    // where they click on the "Login" button at first.
    // We don't want the "returnTo" key remains in the session:
    // delete req.session.returnTo;
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: foundUser._id,
        username: foundUser.username,
        role: foundUser.role
      }
    });
  } catch (e) {
    // req.flash("error", "Something is wrong!");
    res.status(400).json({
      error: e.message,
    });
  }
};

module.exports.logout = (req, res) => {
  req.session.user_id = null;
  req.flash("success", "Successfully logged-out!");
  res.redirect("/login");
};
