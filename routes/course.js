var express = require("express");
var router = express.Router();

const course = require("../controller/course.controller");
const { adddataValidation } = require("../validator/course.validation");

router.post("/add", adddataValidation, course.create);
router.get("/get/:id", course.get);
router.get("/all", course.getAll);
router.get("/delete/:id", course.delete);
router.put("/update/:id", adddataValidation, course.update);

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

module.exports = router;
