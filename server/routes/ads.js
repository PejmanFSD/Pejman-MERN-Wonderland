const express = require('express');
const router = express.Router();
const ads = require('../controllers/ads.js');
const {isLoggedIn, validateAd, isAuthor} = require('../middleware.js');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const {storage} = require('../cloudinary');
// const upload = multer({dest: 'uploads/'});
const upload = multer({storage});

router.route('/')
    // .get(isLoggedIn, catchAsync(ads.index))
    .get(catchAsync(ads.index))
    .post(isLoggedIn, upload.array('image'), validateAd, catchAsync(ads.createAd));
// router.get('/', isLoggedIn, catchAsync(ads.index));
// router.post('/', isLoggedIn, validateAd, catchAsync(ads.createAd));

router.get('/new', isLoggedIn, ads.renderNewForm);

router.route('/:id')
    .get(isLoggedIn, catchAsync(ads.showAd))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateAd, catchAsync(ads.editAd))
    .delete(isLoggedIn, isAuthor, catchAsync(ads.deleteAd));
// router.get('/:id', isLoggedIn, catchAsync(ads.showAd));
// router.put('/:id', isLoggedIn, isAuthor, validateAd, catchAsync(ads.editAd));
// router.delete('/:id', isLoggedIn, isAuthor, catchAsync(ads.deleteAd));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(ads.renderEditForm));

module.exports = router;