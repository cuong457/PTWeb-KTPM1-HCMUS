const express = require("express");
const {
  getListProduct,
  updateItemQuantity,
  updateSelectFieldToItem,
  deleteItem,
} = require("../app/controllers/ProductController");

const {
  protect,
  restrictTo,
} = require("../app/controllers/AuthViewController");

const router = express.Router();

router
  .route("/:id")
  .patch([protect, updateItemQuantity])
  .delete([protect, deleteItem]);
router
  .route("/")
  .patch([protect, updateSelectFieldToItem])
  .get([protect, getListProduct]);

module.exports = router;
