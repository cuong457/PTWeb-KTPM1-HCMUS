const express = require("express");
const {
  getListProduct,
  updateItemQuantity,
  updateSelectFieldToItem,
  deleteItem,
} = require("../app/controllers/ProductController");

const { protect, restrictTo } = require("../app/controllers/AuthController");

const {
  uploadTourImages,
  resizeUploadImages,
  createNewProduct,
} = require("../app/controllers/AdminController");

const router = express.Router();

router
  .route("/:id")
  .patch([protect, updateItemQuantity])
  .delete([protect, deleteItem]);
router
  .route("/")
  .patch([protect, updateSelectFieldToItem])
  .get([protect, getListProduct])
  .post([protect, uploadTourImages, resizeUploadImages, createNewProduct]);

module.exports = router;
