const express = require("express");
const {
	isLoggedIn,
	authoriseAdmin,
} = require("../middlewares/auth.middleware");
const router = express.Router();
const userController = require("../controller/user.controller");
// Admin Permissions
router.get("/all", authoriseAdmin, userController.getAllUsers);
router.patch("/:userId", authoriseAdmin, userController.updateUserById);
router.patch("/b/:userId", authoriseAdmin, userController.blockUserById);
router.patch("/ub/:userId", authoriseAdmin, userController.unBlockUserById);

// Any One
router.get("/:userId", isLoggedIn, userController.getUserById);
router.get(
	"/find/:phoneNumber",
	isLoggedIn,
	userController.getUserByPhoneNumber
);
router.post("/enroll/:courseId", isLoggedIn, userController.enrollInCourse);

// Todo: Pending If Client Asked then,
router.get("/courses", isLoggedIn, userController.getCoursesEnrolledByUser);

module.exports = router;
