const express = require("express");
const {
  renderDashBoard,
  renderBilling,
  renderProfile,
  renderSignIn,
  renderSignUp,
  renderTables,
  renderCreateProduct,
  renderUserDetail,
  renderGoogleSignIn,
  renderGoogleCallback,
  getUserData,
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

router.get("/dashboard", renderDashBoard);
router.get("/billing", renderBilling);
router.get("/profile", renderProfile);
router.get("/usercenter", renderTables);
router.get("/usercenter/get-users-data", getUserData);
router.get("/usercenter/:slug", renderUserDetail);

router
  .get("/products/create", renderCreateProduct)
  .post("/products/create", createNewProduct);

module.exports = router;
