const express = require("express");

const router = express.Router();

const { updateOrder } = require("../app/controllers/OrderController");
const { protect, restrictTo } = require("../app/controllers/AuthController");

router.route("/:id").patch([protect, restrictTo("admin"), updateOrder]);

module.exports = router;
