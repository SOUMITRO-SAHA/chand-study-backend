const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const User = require("./user.model");
const Course = require("./course.model");

// This is many-to-many relationships: Basically a user can have multiple courses and a course can have multiple users.
const Enroll = sequelize.define("enrollments", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	validity: {
		type: DataTypes.DATE,
		allowNull: true,
	},
});

// Define the association
User.belongsToMany(Course, { through: Enroll });
Course.belongsToMany(User, { through: Enroll });

module.exports = Enroll;
