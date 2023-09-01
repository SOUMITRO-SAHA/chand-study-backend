const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const User = require("./user.model");
const Course = require("./course.model");

// This is many-to-many relationships: Basically an user can have multiple courses and a course can have multiple users.
const UserCourse = sequelize.define("usercourses", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
});

User.belongsToMany(Course, { through: UserCourse });
Course.belongsToMany(User, { through: UserCourse });

module.exports = UserCourse;
