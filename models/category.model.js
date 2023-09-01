const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Category = sequelize.define("category", {
	categoryId: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	categoryName: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		defaultValue: "ALL",
	},
});

module.exports = Category;
