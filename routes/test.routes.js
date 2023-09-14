const express = require('express');
const router = express.Router();
const testController = require('../controller/test.controller');
const resultController = require('../controller/result.controller');

const {
  isLoggedIn,
  authoriseAdmin,
} = require('../middlewares/auth.middleware');

// Admin Access:
router.post('/admin/new/add', authoriseAdmin, testController.createTest);
router.post(
  '/admin/update/:testId',
  authoriseAdmin,
  testController.updateTestByTestId
);
router.post('/new/section', authoriseAdmin, testController.createSection);
router.post('/new/question', authoriseAdmin, testController.createQuestion);
router
  .get('/q/:title', authoriseAdmin, testController.getQuestionsBySectionTitle)
  .get('/q/a/all', isLoggedIn, testController.getAllQuestions);

router.get(
  '/q/s/:sectionId',
  isLoggedIn,
  testController.getQuestionsBySectionId
);

router
  .patch(
    '/q/:questionId',
    authoriseAdmin,
    testController.updateQuestionsByQuestionId
  )
  .delete(
    '/q/:questionId',
    authoriseAdmin,
    testController.deleteQuestionByQuestionId
  );

router.post(
  '/q/add',
  authoriseAdmin,
  testController.addExistingQuestionToCurrentSection
);

// Login Access:
router
  .get('/s/:sectionId', isLoggedIn, testController.getSectionById)
  .get('/s/a/unique', isLoggedIn, testController.getAllSectionsByDifferentTitle)
  .get('/all/s/:testId', isLoggedIn, testController.getAllSectionByTestId)
  .patch('/s/:sectionId', isLoggedIn, testController.updateSectionById)
  .delete('/s/:sectionId', isLoggedIn, testController.deleteSectionById);

router.get('/all/:courseId', isLoggedIn, testController.getAllTestsByCourseId);
router.get('/u/:userId', isLoggedIn, testController.getAllTestsByUserId);
router.get('/:testId', isLoggedIn, testController.getTestByTestId);
router.get(
  '/:courseId/:testId',
  isLoggedIn,
  testController.getSectionsByCourseTest
);
router.get(
  '/u/instructions/:testId',
  isLoggedIn,
  testController.getTestInstructionsByTestId
);

// Result + Exam
router.post('/attempt', resultController.create);
router.patch('/save', resultController.save);
router.get('/result/:testId/:resultId', resultController.evaluate);

router.get('/r/all/:testId', resultController.getTestResultsByTestId);

module.exports = router;
