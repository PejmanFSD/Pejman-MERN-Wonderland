const express = require('express');
const router = express.Router();
const Ad = require('../models/ad');
const {adSchema} = require('../schemas.js');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

const validateAd = (req, res, next) => {
    const {error} = adSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

router.get('/', catchAsync(async (req, res) => {
    const ads = await Ad.find({});
    res.render('ads/index', {ads});
}))

router.get('/new', (req, res) => {
    res.render('ads/new');
})

router.post('/', validateAd, catchAsync(async(req, res) => {
    // if (!req.body.ad) throw new ExpressError('Invalid Ad Data', 400);
    const ad = new Ad(req.body.ad);
    await ad.save();
    req.flash('success', 'Successfully made a new Ad!');
    res.redirect(`/ads/${ad._id}`);
}))

router.get('/:id', catchAsync(async (req, res) => {
    const {id} = req.params;
    const ad = await Ad.findById(id);
    if (!ad) {
        // throw new ExpressError('Ad not found!', 404);
        req.flash('error', "Can't find that ad!");
        return res.redirect('/ads');
    }
    res.render('ads/show', {ad});
}))

router.get('/:id/edit', catchAsync(async(req, res) => {
    const id = req.params.id;
    const ad = await Ad.findById(id);
    if (!ad) {
        // throw new ExpressError('Ad not found!', 404);
        req.flash('error', "Can't find that ad!");
        return res.redirect('/ads');
    }
    res.render('ads/edit', {ad});
}))

router.put('/:id', validateAd, catchAsync(async(req, res) => {
    const {id} = req.params;
    const ad = await Ad.findByIdAndUpdate(id, {...req.body.ad}, {runValidators: true, new: true});
    req.flash('success', 'Ad is successfully edited!');
    res.redirect(`/ads/${ad._id}`);
}))

router.delete('/:id', catchAsync(async (req, res) => {
    const {id} = req.params;
    await Ad.findByIdAndDelete(id);
    req.flash('success', 'Ad is successfully deleted!');
    res.redirect('/ads');
}))

module.exports = router;