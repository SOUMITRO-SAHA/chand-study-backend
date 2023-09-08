const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const User = require("./user.model");
const Course = require("./course.model");

const Enrollment = sequelize.define("enrollments", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	validity: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: User,
			key: "id",
		},
	},
	courseId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Course,
			key: "id",
		},
	},
});

module.exports = Enrollment;
