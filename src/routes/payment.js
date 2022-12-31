const express = require("express");

const router = express.Router();

const {
  createCheckoutSession,
} = require("../app/controllers/PaymentController");

const {
  protect,
  restrictTo,
} = require("../app/controllers/AuthViewController");

router.post("/checkout-session", [
  protect,
  restrictTo("user"),
  createCheckoutSession,
]);

module.exports = router;
