const express = require("express");
const {
  signUp,
  signIn,
  signOut,
  verifyEmail,
  updatePassword,
  protect,
  checkEmailExist,
} = require("../app/controllers/AuthController");

const {
  updateMe,
  uploadSingleImage,
  resizeUploadImage,
} = require("../app/controllers/UserController");
const router = express.Router();

// api
router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/email-exist", checkEmailExist);
router.get("/sign-out", [protect, signOut]);
router.get("/verify/:verifyToken", verifyEmail);
router.patch("/update-me", [
  protect,
  uploadSingleImage,
  resizeUploadImage,
  updateMe,
]);
router.patch("/update-password", [protect, updatePassword]);

module.exports = router;
