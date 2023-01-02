const express = require("express");
const {
  postReview,
  getReviewByProductId,
} = require("../app/controllers/ReviewController");
const {
  isLoggedIn,
  protect,
  restrictTo,
} = require("../app/controllers/AuthController");
const router = express.Router();

router.route("/").post([protect, restrictTo("user"), postReview]);
router.route("/:tourId").get(getReviewByProductId);
// router
//   .route("/:id")
//   .get(getReview)
//   .delete([restrictTo("user", "admin"), deleteReview])
//   .patch([restrictTo("user", "admin"), updateReview]);

module.exports = router;
