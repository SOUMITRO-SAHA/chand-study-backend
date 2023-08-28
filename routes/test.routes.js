const express = require("express");
const router = express.Router();
const testController = require("../controller/test.controller");

router.post("/admin/tests", testController.createTest);
router.post("/admin/tests/:testId", testController.getTestById);

module.exports = router;
