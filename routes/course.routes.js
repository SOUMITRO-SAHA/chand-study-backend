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
router.get("/all", authoriseAdmin, courseController.getAllCourses);
router.get("/:courseId", authoriseAdmin, courseController.getCouresByCourseId);
router.get(
	"/tests/:courseId",
	authoriseAdmin,
	courseController.getAllTestsByCourseId
);

// Export:
module.exports = router;
