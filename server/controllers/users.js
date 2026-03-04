const User = require("../models/user");

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
  const user = await User.findById(req.session.user_id)
    .select('-password'); // exclude password, we don't want to send password to UI
  res.status(200).json(user);
};

module.exports.showAd = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  // res.render('users/show', {user});
  res.status(200).json(user);
};
