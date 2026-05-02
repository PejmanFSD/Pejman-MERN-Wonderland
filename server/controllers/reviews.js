const Review = require("../models/review");

module.exports.index = async (req, res) => {
  const { game, page = 1 } = req.query;

  const limit = 3; // 3 reviews in each paginated page
  const skip = (page - 1) * limit; // The number of the review where we should go to a new page
  const filter = game ? { game } : {}; // Filtering the reviews by their "game" attribute

  const reviews = await Review.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("author", "_id username");

  const total = await Review.countDocuments(filter);

  res.json({
    reviews,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
  });
};

module.exports.createReview = async (req, res) => {
  try {
    const { body, rating, game } = req.body;

    const review = new Review({
    body,
    rating,
    game,
    author: req.user._id
    });
    // Authentication:
    if (req.user) {
      review.author = req.user._id; // Giving the new created review an owner!
    }
    await review.save();
    res.status(201).json({
      message: "Review created successfully!",
      review,
    });
  } catch (e) {
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

module.exports.showReview = async (req, res) => {
  const { id } = req.params;
  // const review = await Review.findById(id).populate('author');
  const review = await Review.findById(id);
  console.log(review);
  if (!review) {
    // req.flash('error', "Can't find that review!");
    return res.status(404).json({ error: "Review not found" });
  }
  res.status(200).json(review);
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findById(id);
  if (!review) {
    req.flash("error", "Can't find that review!");
    return res.redirect("/reviews");
  }
  res.render("reviews/edit", { review });
};

module.exports.editReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndUpdate(
      id,
      {
        body: req.body.body,
        rating: req.body.rating
      },
      { new: true, runValidators: true }
    );

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    await review.save();
    res.status(200).json({
      message: "Review updated successfully!",
      review,
    });
  } catch (e) {
    next(e);
  }
};

module.exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  // First find the review:
  const review = await Review.findById(id);
  if (!review) {
    return res.status(404).json({ error: "Review not found" });
  }
  await Review.findByIdAndDelete(id);
  res.status(200).json({ message: "Review deleted successfully" });
};
