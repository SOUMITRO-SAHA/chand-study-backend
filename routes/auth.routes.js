const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");

// Authentication:
// Admin Panel
router.post("/admin/login", authController.logIn);
router.post("/admin/signup", authController.signUp);

// With Email ID:
router.post("/register", authController.signUpWithEmail);
router.post("/login", authController.loginWithEmail);
router.post("/verify", authController.verifyEmailOtp);
router.get("/logout", authController.logOut);

// With Mobile Number:
router.post("/m/register", authController.signUpWithPhoneNumber);
router.post("/m/login", authController.logInWithPhoneNumber);
router.post("/m/verify", authController.verifyPhoneOtp);

module.exports = router;
