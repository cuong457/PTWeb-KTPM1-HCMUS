const express = require("express");
const {
  renderDashBoard,
  renderBilling,
  renderProfile,
  renderSignIn,
  renderSignUp,
  renderTables,
  renderUserDetail,
  renderGoogleSignIn,
  renderGoogleCallback,
  getUserData,
} = require("../app/controllers/AdminController");

const {
  protect,
  restrictTo,
} = require("../app/controllers/AuthViewController");

const router = express.Router();

// sign in with google
router.get("/auth/google", renderGoogleSignIn);
router.get("/google/callback", renderGoogleCallback);

// check login and permission
router.use(protect);
router.use(restrictTo("admin"));

router.get("/usercenter/get-users-data", getUserData);
router.get("/usercenter/:slug", renderUserDetail);
router.get("/dashboard", renderDashBoard);
router.get("/billing", renderBilling);
router.get("/profile", renderProfile);
router.get("/sign-in", renderSignIn);
router.get("/sign-up", renderSignUp);
router.get("/usercenter", renderTables);
router.get("/", renderDashBoard);

module.exports = router;
