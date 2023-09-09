const { DataTypes } = require("sequelize");
const sequalize = require("../config/db.config");
const { Languages } = require("../utils/Languages");

const Lecture = sequalize.define("lectures", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	lectureName: {
		type: DataTypes.STRING,
		allowNull: false,
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
	lectureDescription: {
		type: DataTypes.STRING,
		allowNull: false,
		required: true,
	},
});

module.exports = Lecture;
