const mongoose = require("mongoose");
const Product = require("./Product");
const reviewSchema = mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "please enter your review"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // parent referencing
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "a review must belong to a product"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "a review must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// query middle ware, this prefers to query
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  }).select("-__v");
  next();
});

reviewSchema.statics.updateProductReviewsStats = async function (productId) {
  // this: ReviewModel
  const reviewState = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: "$product",
        nRatings: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  console.log(reviewState);

  if (reviewState.length === 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingsAverage: 0,
      ratingsQuantity: 0,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingsAverage: reviewState[0].avgRating,
      ratingsQuantity: reviewState[0].nRatings,
    });
  }
};

//update ratingsAverage and ratingsQuantity on one Tour when added new Review
reviewSchema.post("save", function () {
  // this: document -> this.constructor: ReviewModel
  this.constructor.updateProductReviewsStats(this.product);
});

// update ratingsAverage and ratingsQuantity on one Tour when update, delete existing Review
// findByIdAndUpdate uses findOneAndUpdate
// findByIdAndDelete uses findOneAndDelete
reviewSchema.pre(/^findOneAnd/, async function (next) {
  // console.log(this);
  // console.log(this.model.updateTourReviewsStats(this.tourId));
  this.r = await this.findOne();
  // console.log(this.r);
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  // query executed so this.findOne() will not work here!
  // this.review.constructor.updateTourReviewsStats(this.review.tour);
  await this.r.constructor.updateProductReviewsStats(this.r.tour);
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
