const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const userModel = require("./user.model"); // Replace with your user model
const testModel = require("./test.model"); // Replace with your test model

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

	// Define a foreign key relationship with userModel
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: userModel,
			key: "id",
		},
	},

	// Define a foreign key relationship with testModel
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
