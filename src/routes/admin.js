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
  getUserData,
  createNewProduct,
} = require("../app/controllers/AdminController");

const { isLoggedIn } = require("../app/controllers/AuthViewController");

const router = express.Router();

// check login and permission
router.use(isLoggedIn);

router.get("/usercenter/get-users-data", getUserData)
router.use("/usercenter/:slug", renderUserDetail);

router
  .get("/products/create", renderCreateProduct)
  .post("/products/create", createNewProduct)

router.use("/dashboard", renderDashBoard);
router.use("/billing", renderBilling);
router.use("/profile", renderProfile);
router.use("/sign-in", renderSignIn);
router.use("/sign-up", renderSignUp);
router.get("/usercenter", renderTables);
router.use("/", renderDashBoard);

module.exports = router;
