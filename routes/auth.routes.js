const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");

// Authentication:
router.post("/register", authController.signUpWithEmail);
router.post("/login", authController.loginWithEmail);

// Todo: Pending
// router.post("/register", authController.signUp);
// router.post("/login", authController.loginWithPhoneNumber);

module.exports = router;
