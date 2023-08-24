const userModel = require("../models/user.model");
const JWT = require("jsonwebtoken");
const { config } = require("../config");
const { AuthRoles } = require("../utils/AuthRoles");

exports.isLoggedIn = async (req, res, next) => {
	let token;
	if (
		req.cookies.token ||
		(req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer"))
	) {
		token = req.cookies.token || req.headers.authorization.split(" ")[1];
	}

	if (!token) {
		res.status(401).json({
			success: false,
			message: "Not authorized to access this route",
		});
	}
	try {
		const decodedJwtPayload = JWT.verify(token, config.JWT_SECRET);
		// Find the User by Id,
		req.user = await userModel.findUnique({
			where: {
				id: decodedJwtPayload.id,
			},
			select: {
				name: true,
				role: true,
			},
		});
		next();
	} catch (error) {
		res.status(401).json({
			success: true,
			message: "Not authorized to access this route",
		});
	}
};

exports.authoriseAdmin = async (req, res, next) => {
	let token;
	if (
		req.cookies.token ||
		(req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer"))
	) {
		token = req.cookies.token || req.headers.authorization.split(" ")[1];
	}

	if (!token) {
		res.status(401).json({
			success: false,
			message: "Not authorized to access this route",
		});
	}

	try {
		const decodedJwtPayload = JWT.verify(token, config.JWT_SECRET);

		req.user = await userModel.findUnique({
			where: {
				id: decodedJwtPayload.id,
			},
			select: {
				name: true,
				role: true,
			},
		});

		if (req.user.role === AuthRoles.TEACHER) {
			return next();
		}
		return res.status(401).json({
			success: false,
			message: "Not authorized to access this route",
		});
	} catch (error) {
		res.status(401).json({
			success: false,
			message: "Not authorized to access this route",
		});
	}
};
