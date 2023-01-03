const express = require("express");
const {
  getListProduct,
  updateItemQuantity,
  updateSelectFieldToItem,
  deleteItem,
  getProductInfo,
  deleteProductsImg,
} = require("../app/controllers/ProductController");

const { protect, restrictTo } = require("../app/controllers/AuthController");

const {
  uploadTourImages,
  resizeUploadImages,
  createNewProduct,
} = require("../app/controllers/AdminController");

const router = express.Router();

router.route("/delete").delete([protect, deleteProductsImg]);
router
  .route("/:id")
  .get([protect, getProductInfo])
  .patch([protect, updateItemQuantity])
  .delete([protect, deleteItem]);
router
  .route("/")
  .patch([protect, updateSelectFieldToItem])
  .get(getListProduct)
  .post([
    protect,
    restrictTo("admin"),
    uploadTourImages,
    resizeUploadImages,
    createNewProduct,
  ]);

module.exports = router;
