const express = require("express");
const router = express.Router();
const ads = require("../controllers/ads.js");
const { isLoggedIn, validateAd, isAuthor, isAdmin } = require("../middleware.js");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router
  .route("/")
  .get(catchAsync(ads.index))
  .post(isLoggedIn, isAdmin, upload.array("image"), validateAd, catchAsync(ads.createAd)); // We use
  // "validateAd" after uploading image(s) because the uploaded image(s) should be validated too

router
  .route("/:id")
  .get(isLoggedIn, isAdmin, isAuthor, catchAsync(ads.showAd))
  .put(isLoggedIn, isAdmin, isAuthor, upload.array("image"), validateAd, catchAsync(ads.editAd)) // We
  // use "validateAd" after uploading image(s) because the uploaded image(s) should be validated too
  .delete(isLoggedIn, isAdmin, isAuthor, catchAsync(ads.deleteAd));

router.get("/:id/edit", isLoggedIn, isAdmin, isAuthor, catchAsync(ads.renderEditForm));

module.exports = router;
