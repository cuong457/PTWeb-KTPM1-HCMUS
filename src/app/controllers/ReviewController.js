const catchAsync = require("../../utils/catchAsync");
const ReviewModel = require("../models/Review");
const { ObjectId } = require("mongodb");

exports.postReview = catchAsync(async (req, res, next) => {
  req.body.user = ObjectId(req.user._id);
  req.body.product = ObjectId(req.body.product);

  console.log(req.body);
  const doc = await ReviewModel.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

// // get one
exports.getReviewByProductId = catchAsync(async (req, res, next) => {
  const doc = await ReviewModel.find({ product: req.params.tourId });
  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: doc.length,
    data: {
      reviews: doc,
    },
  });
});

// // get all
exports.getReviews = catchAsync(async (req, res, next) => {
  const doc = await ReviewModel.find({});

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: doc.length,
    data: {
      reviews: doc,
    },
  });
});
