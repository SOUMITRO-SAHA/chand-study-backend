const express = require("express");
const router = express.Router();
const courseController = require("../controller/course.controller");
const { authoriseAdmin } = require("../middlewares/auth.middleware");

// Routes:
router.post("/add", authoriseAdmin, courseController.create);
router.patch(
	"/update/:courseId",
	authoriseAdmin,
	courseController.updateCourseById
);
router.delete(
	"/delete/:courseId",
	authoriseAdmin,
	courseController.deleteCourseById
);

// For All:
router.get("/all", courseController.getAllCourses);
router.get("/:courseId", courseController.getCouresByCourseId);
router.get("/tests/:courseId", courseController.getAllTestsByCourseId);

router.get("/c/popular", courseController.getPopularCourses);
router.get("/c/free", courseController.getFreeCourses);
router.get("/c/new", courseController.getRecentlyAddedCourses);
router.get("/c/featured", courseController.getFeaturedCourses);

// Export:
module.exports = router;
