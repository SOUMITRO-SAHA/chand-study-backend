const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Test = require("./test.model");
const Question = require("./question.model");

const Section = sequelize.define("sections", {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	marks: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
	negativeMarking: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
});

// Relationships between Section, Test and Questions
Section.hasMany(Question);

module.exports = Section;
