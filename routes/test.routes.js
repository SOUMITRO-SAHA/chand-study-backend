const express = require("express");
const router = express.Router();
const testController = require("../controller/test.controller");
const resultController = require("../controller/result.controller");

const {
	isLoggedIn,
	authoriseAdmin,
} = require("../middlewares/auth.middleware");

// Admin Access:
router.post("/admin/new/add", authoriseAdmin, testController.createTest);
router.post(
	"/admin/update/:testId",
	authoriseAdmin,
	testController.updateTestByTestId
);
router.post("/new/section", authoriseAdmin, testController.createSection);
router.post("/new/question", authoriseAdmin, testController.createQuestion);
router.get(
	"/q/:title",
	authoriseAdmin,
	testController.getQuestionsBySectionTitle
);
router.patch(
	"/q/:questionId",
	authoriseAdmin,
	testController.updateQuestionsByQuestionId
);
router.delete(
	"/q/:questionId",
	authoriseAdmin,
	testController.deleteQuestionByQuestionId
);

// Login Access:
router.get("/all/:courseId", isLoggedIn, testController.getAllTestsByCourseId);
router.get("/u/:userId", isLoggedIn, testController.getAllTestsByUserId);
router.get("/:testId", isLoggedIn, testController.getTestByTestId);
router.get(
	"/:courseId/:testId",
	isLoggedIn,
	testController.getSectionsByCourseTest
);
router.get(
	"/u/instructions/:testId",
	isLoggedIn,
	testController.getTestInstructionsByTestId
);

router.post("/attempt", resultController.create);
router.patch("/save", resultController.save);
router.get("/result/:testId/:resultId", resultController.evaluate);

module.exports = router;
