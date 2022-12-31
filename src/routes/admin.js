const express = require("express");
const {
  renderDashBoard,
  renderProfile,
  renderSignIn,
  renderSignUp,
  renderUserCenter,
  renderCreateProduct,
  getUserData,
  renderGoogleSignIn,
  renderGoogleCallback,
  getProductsData,
  renderProducts,
  banUser,
  uploadTourImages,
  resizeUploadImages,
  createNewProduct,
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

router.use("/dashboard", renderDashBoard);

router.get("/usercenter/ban-user", banUser);
router.get("/usercenter/get-users-data", getUserData);
router.get("/usercenter", renderUserCenter);

router.use("/profile", renderProfile);
router.use("/sign-in", renderSignIn);
router.use("/sign-up", renderSignUp);

router.route("/products/create").get(renderCreateProduct);
router.get("/products/get-products-data", getProductsData);
router.use("/products", renderProducts);

router.get("/dashboard", renderDashBoard);
router.get("/profile", renderProfile);

router.use("/", renderDashBoard);

module.exports = router;
