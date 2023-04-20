import { userService } from "../services/userService.js";

async function registration(req, res, next) {
	try {
		const { nickname, email, dateBirth, password } = req.body;
		const userData = await userService.registration(
			nickname,
			email,
			dateBirth,
			password
		);
		res.cookie("refreshToken", userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});

		return res.json(userData);
	} catch (e) {
		next(e);
	}
}

async function login(req, res, next) {
	try {
	} catch (e) {
		next(e);
	}
}

async function logout(req, res, next) {
	try {
	} catch (e) {
		next(e);
	}
}

async function activate(req, res, next) {
	try {
		const { link } = req.params;
		await userService.activate(link);

		return res.redirect(process.env.CLIENT_URL);
	} catch (e) {
		next(e);
	}
}

async function refresh(req, res, next) {
	try {
	} catch (e) {
		next(e);
	}
}

async function getUsers(req, res, next) {
	try {
	} catch (e) {
		next(e);
	}
}

export const userController = {
	registration,
	login,
	logout,
	activate,
	refresh,
	getUsers,
};
