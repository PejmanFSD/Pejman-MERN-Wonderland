const express = require('express');
const router = express.Router();
const Ad = require('../models/ad');
// const {adSchema} = require('../schemas.js');
const {isLoggedIn, validateAd, isAuthor} = require('../middleware.js');
// const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

router.get('/', isLoggedIn, catchAsync(async (req, res) => {
    const ads = await Ad.find({});
    res.render('ads/index', {ads});
}))

router.get('/new', isLoggedIn, (req, res) => {
    res.render('ads/new');
})

router.post('/', validateAd, isLoggedIn, catchAsync(async(req, res) => {
    const ad = new Ad(req.body.ad);
    ad.author = req.user._id; // Giving the new created ad an owner!
    await ad.save();
    req.user.ads.push(ad._id); // Adding the new created ad to the list of the owner's ads
    await req.user.save();
    req.flash('success', 'Successfully made a new Ad!');
    res.redirect(`/ads/${ad._id}`);
}))

router.get('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const {id} = req.params;
    const ad = await Ad.findById(id).populate('author');
    console.log(ad);
    if (!ad) {
        req.flash('error', "Can't find that ad!");
        return res.redirect('/ads');
    }
    res.render('ads/show', {ad});
}))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async(req, res) => {
    const {id} = req.params;
    const ad = await Ad.findById(id);
    if (!ad) {
        req.flash('error', "Can't find that ad!");
        return res.redirect('/ads');
    }
    res.render('ads/edit', {ad});
}))

router.put('/:id', isLoggedIn, isAuthor, validateAd, catchAsync(async(req, res) => {
    const {id} = req.params;
    const ad = await Ad.findByIdAndUpdate(id, {...req.body.ad}, {runValidators: true, new: true});
    req.flash('success', 'Ad is successfully edited!');
    res.redirect(`/ads/${ad._id}`);
}))

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
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
}))

module.exports = router;