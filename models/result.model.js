const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const userModel = require("./user.model");
const testModel = require("./test.model");

const Result = sequelize.define("Result", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	// Store the user's answers as JSON
	answers: {
		type: DataTypes.JSON,
		allowNull: false,
	},

	marks: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},

	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: userModel,
			key: "id",
		},
	},

	testId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: testModel,
			key: "id",
		},
	},
});

module.exports = Result;
