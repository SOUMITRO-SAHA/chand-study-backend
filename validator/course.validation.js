const { check } = require("express-validator");

exports.adddataValidation = [
	check("courseName", "courseName is requied").not().isEmpty(),
	check("courseDesc", " courseDesc is requied").not().isEmpty(),
	check("instructorOccupation", "instructorOccupation is requied")
		.not()
		.isEmpty(),
	check("instructorName", "instructorName is requied").not().isEmpty(),
	check("instructorDesc", "instructorDesc is requied").not().isEmpty(),
	check("price", "price is requied").not().isEmpty(),
	check("whatYouGet", "whatYouGet is requied").not().isEmpty(),
];

// exports.adddataValidationChild = [
// 	check("name", "name is requied").not().isEmpty(),
// 	check("nickname", " nickname is requied").not().isEmpty(),
// 	check("relation", "relation is requied").not().isEmpty(),
// 	check("gender", "gender is requied").not().isEmpty(),
// 	check("dob", "dob is requied").not().isEmpty(),
// 	check("age", "age is requied").not().isEmpty(),
// 	check("questions", "questions is requied").not().isEmpty(),
// 	check("image", "image is requied").not().isEmpty(),
// ];

exports.adddataValidationChild = [
	check("name").notEmpty().withMessage("Name is required"),
	check("nickname").notEmpty().withMessage("Nickname is required"),
	check("relation").notEmpty().withMessage("Relation is required"),
	check("gender").notEmpty().withMessage("Gender is required"),
	check("dob").notEmpty().withMessage("Date of birth is required"),
	check("age")
		.notEmpty()
		.withMessage("Age is required")
		.isInt({ min: 1 }) // Age should be a positive integer
		.withMessage("Age must be a positive integer"),
	check("questions").notEmpty().withMessage("Questions are required"),
	check("image").notEmpty().withMessage("Image is required"),
];

exports.loginValidation = [
	check("email", "Please include a valid email")
		.isEmail()
		.normalizeEmail({ gmail_remove_dots: true }),
	check("password", "Password must be 6 or more characters").isLength({
		min: 6,
	}),
];
