const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports.index = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // For Pagination
  const limit = 5; // We'll have 5 users per page
  const skip = (page - 1) * limit; // The number of the user where we should go to a new page
  const totalUsers = await User.countDocuments();
  const users = await User.aggregate([
    {
      // Creating a new temporary field called priority:
      $addFields: {
        priority: {
          // username === "Pejman" -> priority = 0 and everyone else → priority = 1:
          $cond: [{ $eq: ["$username", "Pejman"] }, 0, 1],
        },
      },
    },
    {
      // Sort the users first based on the priority (Pejman (Admin) -> always first)
      // Then based on their roles -> Admins first, Players second
      // And finally based on their usernames (alphabetically):
      $sort: {
        priority: 1,
        role: 1,
        username: 1,
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit, // The number of users per page
    },
    {
      $project: { priority: 0 },
    },
  ]);
  // console.log("all users: ", users);
  // res.render('users/index', {users});
  res.json({
    users,
    totalPages: Math.ceil(totalUsers / limit),
    currentPage: page,
  });
};

module.exports.topUsers = async (req, res) => {
  const topUsers = await User.find()
    .sort({ totalPoint: -1 }) // Sorting users based on their "totalPoint"s
    .limit(10) // only top 10 users
    .select("username totalPoint message"); // Returning the fields that should be presented on UI
  const rankedUsers = topUsers.map((user, index) => ({
    rank: index + 1,
    username: user.username,
    totalPoint: user.totalPoint,
    message: user.message,
  }));
  res.json(rankedUsers);
};

module.exports.showUser = async (req, res) => {
  const user = await User.findById(req.session.user_id).select("-password"); // exclude password, we
  // don't want to send password to UI
  res.status(200).json(user);
};

module.exports.editUser = async (req, res) => {
  // We don't have to use "try-catch" because the "handleUserErrors"
  // middleware handles the "Default fallback" with the 500 status code
  // and it's been used in index.js by the "use" keyword
  const { username, message } = req.body;
  // The more protecting controller for prohibiting the hackers to manipulate
  // the "role" or the "totalPoint" in the browser console:
  const user = await User.findById(req.session.user_id);
  user.username = username;
  user.message = message;
  await user.save();
  //const updatedUser = await User.findByIdAndUpdate(
  //  req.session.user_id,
  //  { username, message },
  //  { runValidators: true, new: true, context: "query" } // context: "query" ->
  // Applying schema validators (like maxlength) during update queries
  // ).select("-password"); // We never send "password" to Front-End, even if
  // the user has the ability to change it
  // res.status(200).json(updatedUser);
  res.status(200).json({
    id: user._id,
    username: user.username,
    message: user.message,
    role: user.role,
    totalPoint: user.totalPoint,
  });
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
  if (currentPassword === newPassword) {
    return res.status(400).json({
      message: "New password must be different from current password",
    });
  }
  // Update password (We don't have to hash the password because in model it's
  // automatically hashed with ".pre" keyword)
  user.password = newPassword;
  await user.save();
  res.status(200).json({ message: "Password updated successfully" });
};

module.exports.showAd = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  // res.render('users/show', {user});
  res.status(200).json(user);
};

module.exports.updatePoints = async (req, res) => {
  try {
    // De-structuring the number of point that should be added to "totalPoint"
    const { points } = req.body;
    const user = await User.findByIdAndUpdate(
      req.session.user_id, // Finding the user
      { $inc: { totalPoint: points } }, // Same as: "user.totalPoint += points"
      { new: true },
    );
    res.json(user); // Sending back the updated user (to Front-End)
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
