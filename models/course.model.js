const { DataTypes } = require("sequelize");
const Sequelize = require("sequelize");
const sequelize = require("../config/db.config");
const User = require("./user.model");
const Test = require("./test.model");

const Course = sequelize.define("Course", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	courseName: {
		type: DataTypes.STRING,
		allowNull: false,
		required: true,
	},
	courseDescription: {
		type: DataTypes.STRING,
		allowNull: false,
		required: true,
	},
	price: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	image: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: "",
	},
	whatYouGet: {
		type: Sequelize.JSON,
		allowNull: true,
	},
});

// Define foreign key relationship
Course.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
Course.hasMany(Test, { foreignKey: "courseId", onDelete: "CASCADE" });

module.exports = Course;
