const express = require('express');
const { authoriseAdmin } = require('../middlewares/auth.middleware');
const router = express.Router();
const testController = require('../controller/test.controller');

router.post(
  '/import',
  authoriseAdmin,
  testController.addQuestionsToSectionBySectionId
);

module.exports = router;
