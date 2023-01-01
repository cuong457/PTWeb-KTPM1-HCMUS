const express = require("express");
const {
  renderDashBoard,
  renderProfile,
  renderSignIn,
  renderSignUp,
  renderUserCenter,
  renderCreateProduct,
  renderUpdateProduct,
  getUserData,
  renderGoogleSignIn,
  renderGoogleCallback,
  getProductsData,
  renderProducts,
  banUser,
  uploadTourImages,
  resizeUploadImages,
  createNewProduct,
  updateProduct,
} = require("../app/controllers/AdminController");

const { protect, restrictTo } = require("../app/controllers/AuthController");

const router = express.Router();

// sign in with google
router.get("/auth/google", renderGoogleSignIn);
router.get("/google/callback", renderGoogleCallback);

// check login and permission
router.get("/sign-in", renderSignIn);
router.get("/sign-up", renderSignUp);

router.use(protect);
router.use(restrictTo("admin"));

router.route("/api/v1/products")
  .put([uploadTourImages, resizeUploadImages, updateProduct])

router.use("/dashboard", renderDashBoard);
router.route("/products/update/:id").get(renderUpdateProduct);

router.get("/usercenter/ban-user", banUser);
router.get("/usercenter/get-users-data", getUserData);
router.route("/products/create").get(renderCreateProduct);
router.get("/usercenter", renderUserCenter);

router.use("/profile", renderProfile);
router.use("/sign-in", renderSignIn);
router.use("/sign-up", renderSignUp);

router.get("/products/get-products-data", getProductsData);
router.use("/products", renderProducts);

router.get("/dashboard", renderDashBoard);
router.get("/profile", renderProfile);

router.use("/", renderDashBoard);

module.exports = router;
