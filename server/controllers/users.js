const User = require('../models/user');

module.exports.index = async (req, res) => {
    const users = await User.find();
    console.log('all users: ', users);
    // res.render('users/index', {users});
    res.json(users);
};

module.exports.showAd = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    // res.render('users/show', {user});
    res.status(200).json(user);
}