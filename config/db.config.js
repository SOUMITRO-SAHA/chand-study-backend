const Sequelize = require("sequelize");

const sequelize = new Sequelize({
	database: "chand_study",
	username: "root",
	password: "admin",
	host: "localhost",
	dialect: "mysql",
});

// Testing
sequelize
	.authenticate()
	.then(() => {
		console.log("Database connection established.");
	})
	.catch((err) => {
		console.error("Unable to connect to the database:", err);
	});

module.exports = sequelize;
