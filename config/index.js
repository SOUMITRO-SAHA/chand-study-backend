require("dotenv").config();

exports.config = {
	JWT_SECRET: process.env.JWT_SECRET,
	JWT_EXPIRY: process.env.JWT_EXPIRY || "30d",
	PORT: process.env.PORT || "4000",

	// Twilio
	TW_ACCOUNT_SID: process.env.TW_ACCOUNT_SID,
	TW_AUTH_TOKEN: process.env.TW_ACCOUNT_SID,
};
