const express = require("express");
const { authoriseAdmin } = require("../middlewares/auth.middleware");
const router = express.Router();
const studentController = require("../controller/student.controller");

router.get("/all", authoriseAdmin, studentController.getAllStudentsEnrolled);
router.get(
	"/course/:courseId",
	authoriseAdmin,
	studentController.getStudentsByCourseId
);
router.get("/blocked", authoriseAdmin, studentController.getAllBlockedStudents);

module.exports = router;
