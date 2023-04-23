import jwt from "jsonwebtoken";

function generateToken(payload) {
	const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
		expiresIn: "30m",
	});
	const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
		expiresIn: "30d",
	});
	return {
		accessToken,
		refreshToken,
	};
}

function validateAccessToken(token) {
	try {
		const userData = jwt.verify(token, proccess.env.JWT_ACCESS_SECRET);

		return userData;
	} catch (e) {
		return null;
	}
}

function validateRefreshToken(token) {
	try {
		const userData = jwt.verify(token, proccess.env.JWT_REFRESH_SECRET);

		return userData;
	} catch (e) {
		return null;
	}
}

export const tokenService = {
	generateToken,
	validateAccessToken,
	validateRefreshToken,
};
