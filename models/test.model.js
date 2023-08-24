const { DataTypes } = require("sequelize");
const Sequelize = require("../config/db.config");
const sequelize = require("../config/db.config");

const Test = sequelize.define("Test", {
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
	// Update this later:
});

module.exports = Test;
