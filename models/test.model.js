const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Section = require("./section.model");
const { Languages } = require("../utils/Languages");

const Test = sequelize.define("tests", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	testName: {
		type: DataTypes.STRING,
		allowNull: false,
		required: true,
	},
	duration: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	language: {
		type: DataTypes.ENUM(Object.values(Languages)),
		allowNull: false,
		defaultValue: Languages.HINDI,
	},
	instruction: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	totalMarks: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	totalQuestions: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
});

// Relationship between Test and Section
Test.hasMany(Section);

module.exports = Test;
