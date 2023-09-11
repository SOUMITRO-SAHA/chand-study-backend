const excelController = require("../controller/excel.controller");

const express = require("express");
const router = express.Router();

router.post("/questions/:sectionId", excelController.uploadAndImportQuestions);

module.exports = router;
