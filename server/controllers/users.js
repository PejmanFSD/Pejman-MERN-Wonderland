const User = require("../models/user");
const bcrypt = require('bcrypt');

module.exports.index = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // For Pagination
  const limit = 5; // We'll have 5 users per page
  const skip = (page - 1) * limit; // The number of the user where we should go to a new page
  const totalUsers = await User.countDocuments();

  const users = await User.find()
    .sort({ role: 1, username: 1 }) // Sorting the users, first based on roles and the usernames
    .skip(skip)
    .limit(limit); // The number of users per page
  // console.log("all users: ", users);
  // res.render('users/index', {users});
  res.json({
    users,
    totalPages: Math.ceil(totalUsers / limit),
    currentPage: page,
  });
};

module.exports.showUser = async (req, res) => {
  const user = await User.findById(req.session.user_id).select("-password"); // exclude password, we
  // don't want to send password to UI
  res.status(200).json(user);
};

module.exports.editUser = async (req, res) => {
  console.log(req.body);
  const { username, message } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    req.session.user_id,
    { username, message },
    { runValidators: true, new: true }
  ).select("-password"); // We never send "password" to Front-End, even if
  // the user has the ability to change it
  res.status(200).json(updatedUser);
};

module.exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.session.user_id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  // Compare current password
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Current password is incorrect" });
  }
  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 12);
  // Update password
  user.password = hashedPassword;
  await user.save();
  res.status(200).json({ message: "Password updated successfully" });
};

module.exports.showAd = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  // res.render('users/show', {user});
  res.status(200).json(user);
};
