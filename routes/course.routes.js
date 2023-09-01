const express = require("express");
const router = express.Router();
const courseController = require("../controller/course.controller");
const categoryController = require("../controller/category.controller");
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
// Category Controller
router.post("/cat/add", authoriseAdmin, categoryController.createNewCategory);
router.patch(
	"/cat/update/:categoryId",
	authoriseAdmin,
	categoryController.updateCategory
);
router.delete("/cat/delete", authoriseAdmin, categoryController.deleteCategory);

// For All:
router.get("/all", courseController.getAllCourses);
router.get("/:courseId", courseController.getCouresByCourseId);
router.get("/tests/:courseId", courseController.getAllTestsByCourseId);

router.get("/c/popular", courseController.getPopularCourses);
router.get("/c/free", courseController.getFreeCourses);
router.get("/c/new", courseController.getRecentlyAddedCourses);
router.get("/c/featured", courseController.getFeaturedCourses);

// Extra:
router.get("/c/banner", courseController.banner);
router.post("/c/category", courseController.categoryFilter);

// Export:
module.exports = router;
