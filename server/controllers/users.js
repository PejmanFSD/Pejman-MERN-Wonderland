const User = require('../models/user');

module.exports.index = async (req, res) => {
    const users = await User.find({});
    res.render('users/index', {users});
};

module.exports.showAd = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    res.render('users/show', {user});
}