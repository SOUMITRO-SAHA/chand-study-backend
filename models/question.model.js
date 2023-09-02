const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Question = sequelize.define("questions", {
	content: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	options: {
		type: DataTypes.JSON,
	},
	correctAnswer: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

module.exports = Question;
