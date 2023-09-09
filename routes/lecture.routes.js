const express = require("express");
const router = express.Router();
const lectureController = require("../controller/lecture.controller");

router.get("/all", lectureController.getAll);
router
	.get("/:courseId", lectureController.getAllByCourseId)
	.post("/:courseId", lectureController.createByCourseId)
	.patch("/:lectureId", lectureController.updateById)
	.delete("/:lectureId", lectureController.deleteById);

module.exports = router;
