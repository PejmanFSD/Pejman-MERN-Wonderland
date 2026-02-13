const express = require('express');
const router = express.Router();
const ads = require('../controllers/ads.js');
const {isLoggedIn, validateAd, isAuthor} = require('../middleware.js');
const catchAsync = require('../utils/catchAsync');

router.get('/', isLoggedIn, catchAsync(ads.index));

router.get('/new', isLoggedIn, ads.renderNewForm);

router.post('/', validateAd, isLoggedIn, catchAsync(ads.createAd));

router.get('/:id', isLoggedIn, catchAsync(ads.showAd));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(ads.renderEditForm));

router.put('/:id', isLoggedIn, isAuthor, validateAd, catchAsync(ads.editAd));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(ads.deleteAd));

module.exports = router;