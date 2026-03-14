const express = require("express");
const router = express.Router();
const ads = require("../controllers/ads.js");
const { isLoggedIn, validateAd, isAuthor, isAdmin, isPejman, handleCreatingAdErrors } = require("../middleware.js");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router
  .route("/")
  .get(catchAsync(ads.index))
  .post(isLoggedIn, isAdmin, upload.array("image"), catchAsync(ads.createAd), handleCreatingAdErrors);

router
  .route("/:id")
  .get(isLoggedIn, isAdmin, isPejman, isAuthor, catchAsync(ads.showAd))
  .put(isLoggedIn, isAdmin, isPejman, isAuthor, upload.array("image"), catchAsync(ads.editAd), handleCreatingAdErrors) // We
  // use "validateAd" after uploading image(s) because the uploaded image(s) should be validated too
  .delete(isLoggedIn, isAdmin, isPejman, isAuthor, catchAsync(ads.deleteAd));

router.get("/:id/edit", isLoggedIn, isAdmin, isPejman, isAuthor, catchAsync(ads.renderEditForm));

module.exports = router;
