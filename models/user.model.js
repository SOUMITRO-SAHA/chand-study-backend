const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const { AuthRoles } = require("../utils/AuthRoles");
const Course = require("./course.model");
const Enrollment = require("./enroll.model");

// Create User:
const User = sequelize.define("users", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	userName: {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: "",
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: "",
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: null,
	},
	phoneNumber: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	role: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: AuthRoles.STUDENT,
	},
	isBlocked: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	otp: {
		type: DataTypes.STRING,
		defaultValue: "",
	},
	otpVerified: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
});

User.belongsToMany(Course, { through: "enrollments", foreignKey: "userId" });
User.hasMany(Enrollment, { foreignKey: "userId" });

module.exports = User;
