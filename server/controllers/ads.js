const Ad = require("../models/ad");
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
  const ads = await Ad.find().populate("author", "username");
  // res.render('ads/index', {ads});
  res.json(ads);
};

module.exports.createAd = async (req, res) => {
  try {
    const ad = new Ad(req.body);
    // Pushing all the uploaded images to the "images" array:
    if (req.files && req.files.length > 0) {
      ad.images = req.files.map((f) => ({
        url: f.path,
        filename: f.filename,
      }));
    }
    // Authentication:
    if (req.user) {
      ad.author = req.user._id; // Giving the new created ad an owner!
    }
    await ad.save();
    res.status(201).json(ad);
  } catch (e) {
    // If before facing the error and image / some images are uploaded
    // they should be removed from cloudinary:
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        await cloudinary.uploader.destroy(file.filename);
      }
    }
    // mongoose validation errors
    if (e.name === "ValidationError") {
      const errors = {};
      // Fetching only the message of the error
      for (let field in e.errors) {
        errors[field] = e.errors[field].message;
      }
      return res.status(400).json({ errors });
    }
    // For other errors:
    res.status(500).json({
      error: "Server error",
    });
  }
};

module.exports.showAd = async (req, res) => {
  const { id } = req.params;
  // const ad = await Ad.findById(id).populate('author');
  const ad = await Ad.findById(id);
  console.log(ad);
  if (!ad) {
    // req.flash('error', "Can't find that ad!");
    return res.status(404).json({ error: "Ad not found" });
  }
  // res.render('ads/show', {ad});
  res.status(200).json(ad);
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const ad = await Ad.findById(id);
  if (!ad) {
    req.flash("error", "Can't find that ad!");
    return res.redirect("/ads");
  }
  res.render("ads/edit", { ad });
};

module.exports.editAd = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ad = await Ad.findById(id);
    ad.company = req.body.company;
    ad.text = req.body.text;
    await ad.save();
    // const ad = await Ad.findByIdAndUpdate(
    //   id,
    // { company: req.body.company, text: req.body.text },
    // { runValidators: true, new: true },
    // );
    // Add new images:
    if (req.files && req.files.length > 0) {
      const imgs = req.files.map((f) => ({
        url: f.path,
        filename: f.filename,
      }));
      ad.images.push(...imgs); // We don't want to push an array to the original array
      await ad.save();
    }
    // Deleting images:
    if (req.body.deleteImages) {
      // If image(s) are selected to be removed
      const deleteImages = Array.isArray(req.body.deleteImages)
        ? req.body.deleteImages // Just one image is selected
        : [req.body.deleteImages]; // Multiple images are selected (array)
      // First delete them from the cloud
      for (let filename of deleteImages) {
        await cloudinary.uploader.destroy(filename);
      }
      // Pull out of the images from "images" array only if "filename"s are
      // inside the "req.body.deleteImages"
      await ad.updateOne({
        $pull: { images: { filename: { $in: deleteImages } } },
      });
    }
    // req.flash('success', 'Ad is successfully edited!');
    // res.redirect(`/ads/${ad._id}`);
    res.status(200).json(ad);
  } catch (e) {
    // Deleting newly uploaded images if validation fails
    // if (req.files && req.files.length > 0) {
    //   for (let file of req.files) {
    //     await cloudinary.uploader.destroy(file.filename);
    //   }
    // }
    // mongoose validation errors
    // if (e.name === "ValidationError") {
    //   const errors = {};
    // Fetching only the message of the error
    //   for (let field in e.errors) {
    //     errors[field] = e.errors[field].message;
    //   }
    //   return res.status(400).json({ errors });
    // }
    // For other errors:
    // res.status(500).json({
    //   error: "Server error",
    // });
    next(e);
  }
};

module.exports.deleteAd = async (req, res) => {
  const { id } = req.params;
  // First find the ad:
  const ad = await Ad.findById(id);
  if (!ad) {
    return res.status(404).json({ error: "Ad not found" });
  }
  // if (!req.user) {
  //   return res.status(401).json({ error: "Unauthorized" });
  // }
  // Delete the found ad ONLY IF the logged-in user is the owner of the ad:
  // if (!ad.author.equals(req.user._id)) {
  // req.flash("error", "You don't have the permission!");
  //   return res.status(403).json({ error: "Forbidden" });
  // }
  // Deleting images from Cloudinary
  for (let img of ad.images) {
    await cloudinary.uploader.destroy(img.filename);
  }
  await Ad.findByIdAndDelete(id);
  // req.flash("success", "Ad is successfully deleted!");
  res.status(200).json({ message: "Ad deleted successfully" });
};
