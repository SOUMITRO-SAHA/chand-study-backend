const sequelize = require("../config/db.config");
const User = require("../models/user.model");
const Course = require("../models/course.model");
const Test = require("../models/test.model");
const UserCourse = require("../models/userCourse.model");
const Enrollment = require("../models/enroll.model");
const Category = require("../models/category.model");
const Result = require("../models/result.model");

sequelize
	.sync({ alter: true })
	.then(() => {
		console.log("Models synchronized with the database.");
		process.exit(0); // Exit the script successfully
	})
	.catch((error) => {
		console.error("Error synchronizing models:", error);
		process.exit(1); // Exit the script with an error code
	});
