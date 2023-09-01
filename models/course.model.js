const { DataTypes } = require("sequelize");
const Sequelize = require("sequelize");
const sequelize = require("../config/db.config");
const Test = require("./test.model");
const { Languages } = require("../utils/Languages");

const Course = sequelize.define("courses", {
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
	language: {
		type: DataTypes.ENUM(Object.values(Languages)),
		allowNull: false,
		defaultValue: Languages.HINDI,
	},
	category: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: "ALL",
	},
	isFeatured: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
});

// Define foreign key relationship
Course.hasMany(Test, { foreignKey: "courseId", onDelete: "CASCADE" });

module.exports = Course;
