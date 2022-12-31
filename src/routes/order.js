const express = require("express");

const router = express.Router();

const { createOrder } = require("../app/controllers/OrderController");
const { protect, isLoggedIn } = require("../app/controllers/AuthController");

// router.post("/", [protect, createOrder]);

module.exports = router;
