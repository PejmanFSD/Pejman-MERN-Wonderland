const Ad = require('../models/ad');

module.exports.index = async (req, res) => {
    const ads = await Ad.find({});
    res.render('ads/index', {ads});
}

module.exports.renderNewForm = (req, res) => {
    res.render('ads/new');
}

module.exports.createAd = async(req, res) => {
    const ad = new Ad(req.body.ad);
    // Pushing all the uploaded images to the "images" array:
    ad.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    ad.author = req.user._id; // Giving the new created ad an owner!
    await ad.save();
    console.log(ad);
    req.user.ads.push(ad._id); // Adding the new created ad to the list of the owner's ads
    await req.user.save();
    req.flash('success', 'Successfully made a new Ad!');
    res.redirect(`/ads/${ad._id}`);
}

module.exports.showAd = async (req, res) => {
    const {id} = req.params;
    const ad = await Ad.findById(id).populate('author');
    console.log(ad);
    if (!ad) {
        req.flash('error', "Can't find that ad!");
        return res.redirect('/ads');
    }
    res.render('ads/show', {ad});
}

module.exports.renderEditForm = async(req, res) => {
    const {id} = req.params;
    const ad = await Ad.findById(id);
    if (!ad) {
        req.flash('error', "Can't find that ad!");
        return res.redirect('/ads');
    }
    res.render('ads/edit', {ad});
}

module.exports.editAd = async(req, res) => {
    const {id} = req.params;
    const ad = await Ad.findByIdAndUpdate(id, {...req.body.ad}, {runValidators: true, new: true});
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
    ad.images.push(...imgs); // We don't want to push an array to the original array
    await ad.save();
    req.flash('success', 'Ad is successfully edited!');
    res.redirect(`/ads/${ad._id}`);
}

module.exports.deleteAd = async (req, res) => {
    const {id} = req.params;
    // First find the ad:
    const ad = await Ad.findById(id);
    // Delete the found ad ONLY IF the logged-in user is the owner of the ad:
    if (!ad.author.equals(req.user._id)) {
        req.flash('error', "You don't have the permission!");
        return res.redirect(`/ads/${id}`);
    }
    await Ad.findByIdAndDelete(id);
    req.flash('success', 'Ad is successfully deleted!');
    res.redirect('/ads');
}