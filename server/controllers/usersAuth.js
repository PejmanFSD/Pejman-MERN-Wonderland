const User = require("../models/user");
const isStrongPassword = require('../utils/isStrongPassword.js');
require("dotenv").config();

module.exports.register = async (req, res) => {
  try {
    const { username, password, confirmPassword, role, message, adminSecret } = req.body;
    // Checking if the password is strong:
    if (!isStrongPassword(password)) {
      return res.status(400).json({
        error: "You should enter a strong password"
      });
    }
    // Confirming the password:
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }
    let finalRole = "Player";
    if (role === "Admin") {
      if (adminSecret !== process.env.ADMIN_SECRET) {
        return res.status(403).json({
          error: "Invalid admin secret",
        });
      }
      finalRole = "Admin";
    }
    const user = new User({ username, password, message, role: finalRole });
    // Right before the "save" method, the password will be hashed (in models/user.js)
    await user.save();
    req.session.user_id = user._id;
    res.status(201).json({
      message: "Successfully registered!",
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        message: user.message,
        totalPoint: user.totalPoint
      },
    });
  } catch (e) {
    // duplicate username
    if (e.code === 11000) {
      return res.status(400).json({
        message: "Username already taken. Please choose another one."
      });
    }
    // mongoose validation errors
    if (e.name === "ValidationError") {
      const errors = {};
      // Fetching only the message of the error
      // (For example:
      // "User validation failed: username: The maximum length of username is 12 characters"
      // will become: "The maximum length of username is 12 characters"):
      for (let field in e.errors) {
        errors[field] = e.errors[field].message;
      }
      return res.status(400).json({ errors });
    }
    // For other errors:
    res.status(500).json({
      error: "Server error",
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
    // Redirecting the user (who hadn't logged-in) to the page
    // that they had tried to reach before logging-in:
    // const redirectUrl = req.session.returnTo || "./secret"; // './secret' is for the situation
    // where they click on the "Login" button at first.
    // We don't want the "returnTo" key remains in the session:
    // delete req.session.returnTo;
    return res.status(200).json({
      message: "Successfully logged in!",
      user: {
        id: foundUser._id,
        username: foundUser.username,
        role: foundUser.role,
        totalPoint: foundUser.totalPoint,
        message: foundUser.message
      }
    });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

module.exports.logout = (req, res) => {
  // Removing session from server store:
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        error: "Logout failed"
      });
    }
    // Removing the cookie from browser:
    res.clearCookie("connect.sid");
    return res.status(200).json({
      message: "Successfully logged out!"
    });
  });
};
