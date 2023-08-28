const { DataTypes } = require("sequelize");
const Sequelize = require("sequelize");
const sequelize = require("../config/db.config");
const User = require("./user.model");
const Test = require("./test.model");

const Course = sequelize.define("course", {
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
	images: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: "",
	},
	whatYouGet: {
		type: Sequelize.JSON,
		allowNull: true,
	},
	youtubeLink: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: "",
	},
});

// Define foreign key relationship
Course.hasMany(Test, { foreignKey: "courseId", onDelete: "CASCADE" });

module.exports = Course;
