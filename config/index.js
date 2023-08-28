require("dotenv").config();

exports.config = {
	JWT_SECRET: process.env.JWT_SECRET,
	JWT_EXPIRY: process.env.JWT_EXPIRY || "30d",
	PORT: process.env.PORT || "4000",

	ETH_USERNAME: process.env.ETH_USERNAME,
	ETH_USER: process.env.ETH_USER,
	ETH_PASSWORD: process.env.ETH_PASSWORD,

	// Gmail:
	GMAIL_USER: process.env.GMAIL_USER,
	GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,

	// Twilio
	TW_ACCOUNT_SID:
		process.env.TW_ACCOUNT_SID || "ACe3c521e0c79f2060699b9a041803e848",
	TW_AUTH_TOKEN:
		process.env.TW_ACCOUNT_SID || "b8b18591f2bb84bfc9e6cedafe3ff2ac",
};
