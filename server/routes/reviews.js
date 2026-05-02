const express = require('express');
const router = express.Router({mergeParams: true}); // For having access to the userId
const reviews = require("../controllers/reviews.js");
const catchAsync = require('../utils/catchAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const {isLoggedIn, validateReview, validateCreateReview, validateUpdateReview, canModifyReview, handleCreatingReviewErrors} = require('../middleware.js');

router
  .route("/")
  .get(catchAsync(reviews.index))
  .post(isLoggedIn, validateReview, validateCreateReview, catchAsync(reviews.createReview), handleCreatingReviewErrors);

router
  .route("/:id")
  .get(isLoggedIn, catchAsync(reviews.showReview))
  .put(isLoggedIn, catchAsync(canModifyReview), validateUpdateReview, catchAsync(reviews.editReview), handleCreatingReviewErrors)
  .delete(isLoggedIn, catchAsync(canModifyReview), catchAsync(reviews.deleteReview));

router.get("/:id/edit", isLoggedIn, canModifyReview, catchAsync(reviews.renderEditForm));

module.exports = router;
