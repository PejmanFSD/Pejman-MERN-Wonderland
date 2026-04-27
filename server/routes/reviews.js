const express = require('express');
const router = express.Router({mergeParams: true}); // For having access to the userId
const reviews = require("../controllers/reviews.js");
// const Review = require('../models/review.js');
// const User = require('../models/user.js');
const catchAsync = require('../utils/catchAsync.js');
const ExpressError = require('../utils/ExpressError.js');
// const {reviewSchema} = require('../schemas.js');
const {isLoggedIn, validateReview, canModifyReview, handleCreatingReviewErrors} = require('../middleware.js');

router
  .route("/")
  .get(catchAsync(reviews.index))
  .post(isLoggedIn, validateReview, catchAsync(reviews.createReview), handleCreatingReviewErrors);

router
  .route("/:id")
  .get(isLoggedIn, catchAsync(reviews.showReview))
  .put(isLoggedIn, canModifyReview, validateReview, catchAsync(reviews.editReview), handleCreatingReviewErrors)
  .delete(isLoggedIn, canModifyReview, catchAsync(reviews.deleteReview));

router.get("/:id/edit", isLoggedIn, canModifyReview, catchAsync(reviews.renderEditForm));

module.exports = router;
